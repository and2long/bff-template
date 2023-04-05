import { Request, Response } from "express";
import { keycloak } from "./keycloak-setup";
import { TechnicalError } from "../errors/technical-error";

export const getUserId = async (req: Request, res: Response): Promise<string> => {
  try {
    const grant = await keycloak.getGrant(req, res);
    const token = grant.access_token;
    return (token as any).content.sub;
  } catch (e) {
    console.log("Unable to find the token in KC response")
    throw new TechnicalError("Unable to find the token in KC response");
  }
};