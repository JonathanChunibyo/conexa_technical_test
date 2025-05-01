// libraries
import { Injectable } from "@nestjs/common";

@Injectable()
export class Base64Service {
  /**
   * Decodes a Base64-encoded string
   * @param encodedText - Base64 string
   * @returns Decoded string
   */
  decodeBase64(encodedText: string): string {
    try {
      return Buffer.from(encodedText, "base64").toString("utf-8");
    } catch (error) {
      throw new Error("Invalid Base64 string");
    }
  }

  encodeBase64(text: string): string {
    try {
      return Buffer.from(text, "utf-8").toString("base64");
    } catch (error) {
      throw new Error("Error encoding to Base64");
    }
  }
}
