// Fetch do CDI a partir do endpoint do BCB que você passou.
// Exemplo: https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/1?formato=json
import axios from "axios";

export type BcbCdiResponseItem = { data: string, valor: string }

export const fetchLatestCdi = async (): Promise<number> => {
  const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/1?formato=json';
  const response = await axios.get<BcbCdiResponseItem[]>(url);
  const last = response.data[0];
  const value = parseFloat(last.valor.replace(',', '.'));
  return value;
}