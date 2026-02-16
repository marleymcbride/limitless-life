// src/app/api/submissions/__tests__/route.test.ts

import { GET } from '../route';

describe('/api/submissions', () => {
  it('should return submissions list', async () => {
    const request = new Request('http://localhost:3000/api/submissions');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('submissions');
    expect(data).toHaveProperty('pagination');
  });

  it('should support type filter', async () => {
    const request = new Request('http://localhost:3000/api/submissions?type=course');
    const response = await GET(request);

    expect(response.status).toBe(200);
  });
});
