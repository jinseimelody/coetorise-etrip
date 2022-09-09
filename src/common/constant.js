const http_status = {
  ok: 200,
  created: 201,
  no_content: 204,
  unprocessable_entity: 422,
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  not_modified: 304,
  method_not_allowed: 405,
  gone: 410,
  internal_server_error: 500
};

const ticket_status = {
  waiting: 'WAITING',
  paid: 'PAID',
  canceled: 'CANCELED'
};

export {http_status, ticket_status};
