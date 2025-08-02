import { describe, it, expect } from "bun:test";
import axios from "axios";

const DATABASE_URL = "http://localhost:3000";

describe("Website gets created", () => {
    it("Website not created if url is not present", async () => {
        try {
            await axios.post(`${DATABASE_URL}/website`, {});
            expect(false, "website created with no url");
        } catch (error) {
            console.log(error); // expected: server should throw error for missing URL
        }
    });

    it.todo("Website is created if url is not present", async () => {

        const response = await axios.post(`${DATABASE_URL}/website`, {
            url: "https://google.com",
        });
        expect(response.data.id).not.toBeNull();

    });
});
