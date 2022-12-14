import RenderAuthorize from '@/components/Authorized';
// eslint-disable-next-line import/no-cycle
import { getAuthority } from './authority';

/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getAuthority()); // Reload the rights component

const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};
/**
 * hard code
 * block need it。
 */

window.reloadAuthorized = reloadAuthorized;
export { reloadAuthorized };
export default Authorized;
