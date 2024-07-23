import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class DynamoDBService {
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
    this.docClient = DynamoDBDocumentClient.from(dynamoDB);
  }

  async update(tableName: string, id, attributes: Record<string, any>): Promise<any> {
    try {
      let updateExpression = "set";
      const expressionAttributeValues: { [key: string]: any } = {};

      Object.keys(attributes).forEach((key, index) => {
        updateExpression += ` ${key} = :value${index}`;
        if (index < Object.keys(attributes).length - 1) {
          updateExpression += ",";
        }
        expressionAttributeValues[`:value${index}`] = attributes[key];
      });

      const command = new UpdateCommand({
        TableName: tableName,
        Key: { id: id },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
      });

      const result = await this.docClient.send(command);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async scan(tableName: string): Promise<any[] | any> {
    try {
      const command = new ScanCommand({ TableName: tableName });
      const result = await this.docClient.send(command);
      return result.Items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get(tableName: string, id: string): Promise<any> {
    try {
      const command = new GetCommand({ TableName: tableName, Key: { id } });
      const result = await this.docClient.send(command);
      return result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async put(tableName: string, item: Record<string, any>): Promise<any> {
    try {
      const command = new PutCommand({
        TableName: tableName,
        Item: { id: uuidv4(), ...item },
      });
      const result = await this.docClient.send(command);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(tableName: string, id: string): Promise<any> {
    try {
      const command = new DeleteCommand({ TableName: tableName, Key: { id } });
      const result = await this.docClient.send(command);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
