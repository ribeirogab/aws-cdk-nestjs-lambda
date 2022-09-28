import { HttpStatus } from '@nestjs/common';

import { container } from './app.container';

export const handler = async () => {
  const { appService } = await container();

  return {
    statusCode: HttpStatus.OK,
    headers: {},
    body: JSON.stringify({ message: appService.getHello() }),
  };
};
