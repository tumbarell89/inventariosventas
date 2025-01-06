const API_URL = '/api/tazacambio';

// Función auxiliar para obtener el token de autorización
function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

// Función auxiliar para manejar las respuestas de fetch
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ocurrió un error en la solicitud');
  }
  return response.json();
}

// Función auxiliar para crear los headers de la solicitud
function createHeaders(): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const token = getAuthToken();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
}

export const fetchMonedas = async (): Promise<{ id: number; denominacion: string }[]> => {
  const response = await fetch(`${API_URL}/monedas`, {
    headers: createHeaders(),
  });
  return handleResponse(response);
};

export const addMoneda = async (denominacion: string): Promise<{ id: number; denominacion: string }> => {
  const response = await fetch(`${API_URL}/monedas`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify({ denominacion }),
  });
  return handleResponse(response);
};

export const createInitialRates = async (monedaId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/monedas`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify({ monedaId }),
  });
  return handleResponse(response);
};

export const deleteMoneda = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/monedas`, {
    method: 'DELETE',
    headers: createHeaders(),
    body: JSON.stringify({ id }),
  });
  return handleResponse(response);
};

export const fetchTazasCambio = async (): Promise<Record<string, Record<string, number>>> => {
  const response = await fetch(`${API_URL}/tazas-cambio`, {
    headers: createHeaders(),
  });
  return handleResponse(response);
};

export const updateTazasCambio = async (tasas: Record<string, Record<string, number>>): Promise<void> => {
  const response = await fetch(`${API_URL}/tazas-cambio`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify(tasas),
  });
  return handleResponse(response);
};

export const fetchHistoricoTazasCambio = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/historico-tazas-cambio`, {
    headers: createHeaders(),
  });
  return handleResponse(response);
};

export const fetchLatestTazaCambio = async (): Promise<Record<string, Record<string, number>>> => {
  const response = await fetch(`${API_URL}/tazas-cambio`, {
    headers: createHeaders(),
  });
  return handleResponse(response);
};
