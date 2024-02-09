import { useNavigate } from "react-router-dom"

const useHistory = () => {
  const navigate = useNavigate();
  const push = (url, options) => navigate(url, options);
  const replace = (url, options) => navigate(url, { replace: true, ...options });
  
  return {
    push,
    replace
  }
};

export default useHistory;