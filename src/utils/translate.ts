import {
  TranslateClient,
  TranslateTextCommand,
} from "@aws-sdk/client-translate";
import * as dotenv from "dotenv";
dotenv.config();
const configure = {
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
};
export class Translate {
  private readonly translateClient = new TranslateClient([configure]);

  async translateText(text: string): Promise<string> {
    try {
        
    } catch (error) {
        
    }
    const translateTextCommand = new TranslateTextCommand({
      SourceLanguageCode: "en",
      TargetLanguageCode: "es",
      Text: text,
    });
    const { TranslatedText } = await this.translateClient.send(
      translateTextCommand
    );

    const cleanString = TranslatedText.replace(/«|»/g, "");
    return cleanString;
  }
}
