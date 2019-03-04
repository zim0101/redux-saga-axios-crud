/*
 * Banner Messages
 *
 * This contains all the text for the Banner component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Banner';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Banner component!',
  },
});
