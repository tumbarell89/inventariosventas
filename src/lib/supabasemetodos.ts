import { supabase } from "./supabase";
import type {
  User,
  Admin,
  Oferta,
  ProductoVendido,
  ResumenDiario,
  VentaFinalizada,
  NuevaOferta,
} from "./supabasenegocio";
import bcrypt from "bcryptjs";

export async function fetchOfertas(negocio_id: number) {
  const { data, error } = await supabase
    .from("ofertas")
    .select("*")
    .order("id")
    .eq("negocio_id", negocio_id);

  if (error) {
    console.error("id:", negocio_id);
    console.error("Error fetching ofertas:", error);
    return [];
  }

  return data || [];
}

export async function insertarVenta(
  newItems: {
    vendedor_telf: string;
    productos: { producto: string; cantidad: number; precio: number }[];
    comprobante: string;
  },
  total: number,
  user_id: string,
  vendedorTelefono: string
) {
  return await supabase.rpc("insertar_orden", {
    p_items: newItems,
    p_total: total,
    p_negocio_id: user_id,
    p_vendedor_telefono: vendedorTelefono,
  });
}

export async function inserOferta(oferta: NuevaOferta) {
  return await supabase
    .from("ofertas")
    .insert([{ ...oferta, disponible: true }])
    .select();
}

export async function updateOferta(oferta: Oferta, id: number) {
  return await supabase.from("ofertas").update(oferta).eq("id", id);
}

export async function deleteOferta(id: number) {
  return await supabase.from("ofertas").delete().eq("id", id);
}

export async function resumenVenta(negocio_id: string) {
  return await supabase.rpc("resumen_ventas_diarias_detallado2", {
    negocio_id_param: negocio_id,
  });
}
export async function listarOrdenesconVendedor(negocio_id: string) {
  return await supabase.rpc("listar_ordenes_con_vendedor", {
    negocioid: negocio_id,
  });
}
export async function delVenta(id: number) {
  return await supabase.from("ordenes").delete().eq("id", id);
}

export async function insertarAdminNegocio(
  telefono: string,
  contrasena: string,
  nombre_negocio: String
) {
  return await supabase.from("usuarios").insert([
    {
      telefono,
      contrasena,
      nombre_negocio: nombre_negocio,
      es_admin: true,
    },
  ]);
}

export async function UserNegocio(negocio: String) {
  return await supabase
    .from("usuarios")
    .select("*")
    .eq("es_admin", false)
    .eq("admin_id", negocio);
}

export async function CreateUserNegocio(
  telefono: String,
  password: string,
  nombre_negocio: string,
  adminid: string,
  tipo: string
) {
  const contrasena = await bcrypt.hash(password, 10);
  return await supabase.from("usuarios").insert([
    {
      telefono,
      contrasena,
      nombre_negocio: nombre_negocio,
      es_admin: false,
      admin_id: adminid,
      tipo: tipo,
    },
  ]);
}

export async function UpdateUserNegocio(
  telefono: String,
  password: string,
  id: string,
  tipo: string
) {
  const contrasena = await bcrypt.hash(password, 10);
  return await supabase
    .from("usuarios")
    .update({ telefono, contrasena, tipo })
    .eq("id", id);
}

export async function DeleteUserNegocio(id: string) {
  return await supabase.from("usuarios").delete().eq("id", id);
}

export async function UpdatePassAdmin(
  password: string,
  id: string
) {
  const contrasena = await bcrypt.hash(password, 10);
  console.debug('asdadad');
  return await supabase
    .from("usuarios")
    .update({ contrasena })
    .eq("id", id);
}