export function isErrorResponse(response: any) {
  return typeof response.status !== undefined &&
    response.status >= 400
}