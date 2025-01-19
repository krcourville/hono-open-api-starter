import { test, expect} from 'vitest';
import { app } from './server';

test("app exists", () => {
    expect(app).toBeDefined();
});