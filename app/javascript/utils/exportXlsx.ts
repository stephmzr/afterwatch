import qs from 'qs';
import { decamelizeKeys } from 'humps';
import axiosClient from "./axiosClient";

const exportXlsx = (url: string) => (search: any) => {
  axiosClient
    .get('/export/generate_token')
    .then(({ export_token }) => {
      const searchQuery = qs.stringify(
        { search: decamelizeKeys(search || {}), token: export_token },
        { arrayFormat: 'brackets' },
        );
      window.open(`${url}.xlsx?${searchQuery}`);
    });
};

export default exportXlsx;