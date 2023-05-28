import { Transfer } from "@/libs/client/types";
import Image from "next/image";
import MintCard from "@public/mint.png";
import UploadCard from "@public/upload.png";
import PurchaseCard from "@public/purchase.png";
import Chain from "@public/chain.png";
import { Card, CardContent } from "@mui/material";
import { Fragment } from "react";

interface TransferCardProps {
  transfer: Transfer;
}

export default function TransferCard({ transfer }: TransferCardProps) {
  //handling method
  let methodImage = MintCard;
  if (transfer.method === "upload") methodImage = UploadCard;
  else if (transfer.method === "purchase") methodImage = PurchaseCard;
  //handling date
  const date = new Date(transfer.createdAt);

  return (
    <Fragment>
      {transfer.method !== "mint" && (
        <Image
          alt="chain"
          height={40}
          src={Chain}
          className="mx-auto"
        />
      )}
      <Card sx={{ maxWidth: 500, minWidth: 300 }}>
        <Image
          alt="mint"
          width="500"
          src={methodImage}
        />
        <CardContent>
          <div className="flex justify-between w-full">
            <h4 className="font-bold">컨트랙트 주소</h4>
            <span className="font-extrabold">{`${date.getFullYear()}.${
              date.getMonth() + 1
            }.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}</span>
          </div>
          <p className="text-sm mt-2 text-ellipsis overflow-hidden text-sky-600">
            {transfer.contractAddress}
          </p>
          <div className="mt-3">
            <h4 className="font-bold">FROM</h4>
            <p className="text-sky-600 text-sm">{transfer.fromAddress}</p>
            <h4 className="font-bold mt-1">TO</h4>
            <p className="text-sky-600 text-sm">{transfer.toAddress}</p>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
