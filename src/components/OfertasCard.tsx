import { useState, useEffect, type ReactNode, type ButtonHTMLAttributes } from "react";
import { PlusIcon, MinusIcon, Search, ShoppingBag, LogOut } from "lucide-react";
import {
  ChevronUpIcon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";
import { supabase } from "../lib/supabase";
import type { Oferta } from "../lib/supabasenegocio";
import { fetchOfertas, insertarVenta } from "../lib/supabasemetodos";
import ListaVentasFinalizadas from "./VentasFinalizadas";

type ButtonVariant = "default" | "outline" | "destructive";
type ButtonSize = "default" | "sm" | "lg";

// Definir la interfaz de las propiedades
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}
// Custom Button component
const Button : React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyle =
    "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizeStyles = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Input component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

export default function OfertasCard() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [filteredOfertas, setFilteredOfertas] = useState<Oferta[]>([]);
  const [selectedOfertas, setSelectedOfertas] = useState<Map<number, number>>(
    new Map()
  );
  const [activeOferta, setActiveOferta] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOfertasTable, setShowOfertasTable] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [comprobante, setComprobante] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      setUser(user);
      setIsAdmin(user.es_admin || false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      let id = user.es_admin ? user.id : user.admin_id;
      loadOfertas(id);
    }
    const subscription = supabase
      .channel("ofertas_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ofertas" },
        handleOfertasChange
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    setFilteredOfertas(
      ofertas.filter((oferta) =>
        oferta.producto.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, ofertas]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  async function loadOfertas(negocio_id: number) {
    const data = await fetchOfertas(negocio_id);
    setOfertas(data);
  }

  function handleOfertasChange(payload: any) {
    console.debug("Cambio en ofertas:", payload);
    fetchOfertas(user.id);
  }

  const handleOfertaClick = (id: number) => {
    setSelectedOfertas((prevSelected) => {
      const newSelected = new Map(prevSelected);
      const currentCount = newSelected.get(id) || 0;
      newSelected.set(id, currentCount + 1);
      return newSelected;
    });
    console.debug(activeOferta);
    setActiveOferta(id);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setSelectedOfertas((prevSelected) => {
      const newSelected = new Map(prevSelected);
      if (newQuantity > 0) {
        newSelected.set(id, newQuantity);
      } else {
        newSelected.delete(id);
      }
      return newSelected;
    });
  };

  const handleMouseLeave = (id: number) => {
    if (selectedOfertas.get(id) === 0) {
      setSelectedOfertas((prevSelected) => {
        const newSelected = new Map(prevSelected);
        newSelected.delete(id);
        return newSelected;
      });
    }
    setActiveOferta(null);
  };

  const calculateTotal = () => {
    return Array.from(selectedOfertas.entries()).reduce(
      (total, [id, count]) => {
        const oferta = ofertas.find((o) => o.id === id);
        return total + (oferta ? oferta.precio * count : 0);
      },
      0
    );
  };

  const finalizarVenta = async () => {
    setIsLoading(true);
    const itemsVenta = Array.from(selectedOfertas.entries())
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        const oferta = ofertas.find((o) => o.id === id)!;
        return {
          producto: oferta.producto,
          cantidad: count,
          precio: oferta.precio,
        };
      });

    if (itemsVenta.length === 0) {
      setErrorMessage("No hay valores para generar una venta");
      setIsLoading(false);
      return;
    }

    const total = calculateTotal();
    const vendedorTelefono = user.telefono;

    const newItems = {
      vendedor_telf: vendedorTelefono,
      productos: itemsVenta,
      comprobante: comprobante
    };

    try {
      const { error } = await insertarVenta(
        newItems,
        total,
        user.id,
        vendedorTelefono
      );

      if (error) {
        console.error("Error al finalizar la venta:", error);
        setErrorMessage(
          "Error al finalizar la venta. Por favor, intente de nuevo."
        );
      } else {
        setSelectedOfertas(new Map());
        setErrorMessage(null);
        alert("Venta finalizada con éxito");
        setUpdateFlag(!updateFlag);
        setComprobante("");
      }
    } catch (error) {
      console.error("Error al finalizar la venta:", error);
      setErrorMessage(
        "Error al finalizar la venta. Por favor, intente de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-fit sm:w-full bg-white p-6 md:pd-6!">
      <div className="max-w-7xl mx-auto bg-yellow-200 rounded-lg shadow-lg min-h-screen p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="order-2 sm:order-1 w-full sm:w-3/5">
            <Button
              onClick={() => setShowOfertasTable(!showOfertasTable)}
              className="border-0 bg-gray-800 hover:bg-gray-800 w-full text-white py-2 px-4 rounded flex justify-between items-center"
              variant="outline"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Ofertas del Día en {user.nombre_negocio}
              </h1>
              {showOfertasTable ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-2 w-full sm:w-auto text-white md:text-black">
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  (window.location.href = "/admin/ventas-finalizadas")
                }
                className="w-full sm:w-auto"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Ver Ventas Realizadas
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-[1.5fr,1fr] gap-6">
          <div>
            {showOfertasTable && (
              <>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2 bg-yellow-100 p-4 rounded-lg">
                  {filteredOfertas.map((oferta) => (
                    <div
                      key={oferta.id}
                      className="flex justify-between items-center p-3 hover:bg-yellow-200 rounded-lg cursor-pointer"
                      onClick={() => handleOfertaClick(oferta.id)}
                      onMouseLeave={() => handleMouseLeave(oferta.id)}
                    >
                      <span className="text-gray-700">{oferta.producto}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ${oferta.precio.toFixed(2)}
                        </span>
                        {(selectedOfertas.get(oferta.id) ?? 0 > 0) && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(
                                  oferta.id,
                                  (selectedOfertas.get(oferta.id) || 0) - 1
                                );
                              }}
                            >
                            <MinusIcon className="h-4 w-4" />
                            </Button>
                            <input
                              type="number"
                              min="0"
                              value={selectedOfertas.get(oferta.id) || 0}
                              onChange={(e) =>
                                handleQuantityChange(
                                  oferta.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-12 px-2 py-1 text-center bg-amber-500 focus:bg-amber-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(
                                  oferta.id,
                                  (selectedOfertas.get(oferta.id) || 0) + 1
                                );
                              }}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 text-sm">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">Venta a Realizar</h1>
              <div className="overflow-x-auto">
                <table className="w-full mb-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2">Producto</th>
                      <th className="text-right p-2">Cantidad</th>
                      <th className="text-right p-2">Precio</th>
                      <th className="text-right p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(selectedOfertas.entries()).map(
                      ([id, cantidad]) => {
                        const oferta = ofertas.find((o) => o.id === id);
                        if (!oferta) return null;
                        return (
                          <tr key={id} className="border-b">
                            <td className="p-2">{oferta.producto}</td>
                            <td className="text-right p-2">{cantidad}</td>
                            <td className="text-right p-2">
                              ${oferta.precio.toFixed(2)}
                            </td>
                            <td className="text-right p-2">
                              ${(oferta.precio * cantidad).toFixed(2)}
                            </td>
                          </tr>
                        );
                      }
                    )}
                    <tr className="font-semibold">
                      <td className="py-2">Total</td>
                      <td className="text-right py-2"></td>
                      <td className="text-right py-2"></td>
                      <td className="text-right py-2">
                        ${calculateTotal().toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mb-4">
                  <label htmlFor="comprobante" className="block text-sm font-medium text-gray-700 mb-1">
                    Comprobante de transferencia
                  </label>
                  <Input
                    id="comprobante"
                    type="text"
                    value={comprobante}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)  => setComprobante(e.target.value)}
                    placeholder="Ingrese el comprobante de transferencia"
                    className="w-full"
                  />
                </div>
                <Button
                  className="w-full bg-black hover:bg-gray-800"
                  onClick={finalizarVenta}
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : "Finalizar Venta"}
                </Button>
                {errorMessage && (
                  <p className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
            <div className="pt-[20px]"></div>
            {/* Lista de Ventas Finalizadas section */}
            {/* Completed Sales */}
            <div className="bg-white rounded-lg p-4">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">Ventas Finalizadas</h1>
              <div className="max-h-[60vh] md:max-h-max overflow-y-auto">
                <ListaVentasFinalizadas updateFlag={updateFlag} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-center font-semibold">Cargando...</p>
          </div>
        </div>
      )}
    </div>
  );
}
