import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [telefono, setTelefono] = useState('');
  const [telefonoValido, setTelefonoValido] = useState(true);
  const [contrasena, setContrasena] = useState('');
  const [nombreNegocio, setNombreNegocio] = useState('');
  const [correo, setCorreo] = useState('');
  const [correoValido, setCorreoValido] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchWithErrorHandling = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.debug(response);
      console.debug(errorData);
      throw new Error(errorData.error || 'Error en la solicitud');
    }
    return await response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // const ipResponse = await fetch('/api/get-ip');
        // if (!ipResponse.ok) {
        //   throw new Error(`No se pudo obtener la dirección IP: ${ipResponse.statusText}`);
        // }
        // const { ip } = await ipResponse.json();
        
        const data = await fetchWithErrorHandling('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ telefono, contrasena }),
        });
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        //if(data.user.es_admin){
          window.location.href = '/admin/admin-panel';
        // } else {
        //   // if(data.user.tipo=="vendedor"){
        //   //   window.location.href = '/ofertas/ofertas';
        //   // } else {
        //     window.location.href = '/ofertas/vendedor';
        //  // }
        // }
      } else {
        const data = await fetchWithErrorHandling('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ telefono, contrasena, nombreNegocio, correo }),
        });
        console.debug('Registro exitoso:', data);
        setError('Registro exitoso. Ya puede iniciar sesión');
        setIsLogin(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error. Por favor, intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isNumeric = /^\d{0,8}$/.test(value);
    setTelefono(value);
    setTelefonoValido(isNumeric && value.length === 8);
  };

  const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCorreo(value);
    setCorreoValido(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-blue-900 p-10 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? 'Iniciar sesión' : 'Registrar nuevo Negocio'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="telefono" className="sr-only">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                  isLoading ? 'bg-blue-400' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Teléfono"
                value={telefono}
                onChange={handleTelefonoChange}
                disabled={isLoading}
              />
              {!telefonoValido && (
                <div className="text-red-500 text-sm mt-1">
                  El teléfono no es válido.
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="contrasena" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="contrasena"
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {!isLogin && (
              <>
                <div className="mb-4 pt-4">
                  <label htmlFor="nombreNegocio" className="sr-only">
                    Nombre del Negocio
                  </label>
                  <input
                    id="nombreNegocio"
                    name="nombreNegocio"
                    type="text"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nombre del Negocio"
                    value={nombreNegocio}
                    onChange={(e) => setNombreNegocio(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-4 pt-4">
                  <label htmlFor="correo" className="sr-only">
                    Correo Electrónico
                  </label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    required
                    className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                      isLoading ? 'bg-blue-400' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={handleCorreoChange}
                    disabled={isLoading}
                  />
                  {!correoValido && (
                    <div className="text-red-500 text-sm mt-1">
                      El correo electrónico no es válido.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Cargando...' : (isLogin ? 'Iniciar sesión' : 'Registrarse')}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-300 hover:text-indigo-200"
            disabled={isLoading}
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
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

