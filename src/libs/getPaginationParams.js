/* TODO: add tests */

export default function getPaginationParams(page = 1, limit = 0) {
  const skipParameter = page > 0 && limit > 0 ? (page - 1) * limit : undefined;
  const limitParameter = limit > 0 ? limit : undefined;

  return {
    skip: skipParameter,
    limit: limitParameter,
  };
}
