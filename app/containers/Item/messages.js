/*
 * Item Messages
 *
 * This contains all the text for the Item container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Item';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Item container!',
  },
});
