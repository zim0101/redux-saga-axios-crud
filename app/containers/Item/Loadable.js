/**
 *
 * Asynchronously loads the component for Item
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
