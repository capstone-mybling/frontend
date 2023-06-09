/**
 * 완료한 목록
 * 1. 전체적인 UI 만들기
 * 2. useForm 라이브러리로 변경
 * 3. 이미지 업로드 시 화면에 띄우기
 * 4. required 필드를 채우지 않았을 시, 제출 form 비활성화
 * 5. Add file 하는 즉시 파일을 받아옴(콘솔확인) 그러나 전체 Form 제출 시 업로드 된 이미지에 대한 정보가 사라짐 -> 아마도 line 68, 74의 순서 때문인 것 같은데 .. 바꾸면 코드가 안돌아감 ㅋ
 * 6. 이미지 업로드 시 화면에 띄워지지만 비율이 짤리는 경우가 발생
 * 7. required 필드를 채우지 않았을 시, 제출 form 비활성화 효과를 주고싶음 (제출버튼 hover시 디자인과 마우스커서가 pointer로 변경되지 않게)
 */

import { FieldErrors, useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { cls } from "@/libs/client/utils";
import useWeb3 from "@/hooks/useWeb3";
import axios from "axios";

import ProgressLoading from "@/components/ProgressLoading";
import { useRouter } from "next/router";

enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  METADATA = "metadata",
}

interface UploadForm {
  name: string;
  externalUrl: string;
  description: string;
  file: any;
  image: File;
  fileType: FileType;
  properties: {
    [key: string]: string;
  };
  count: number;
  price: number;
}

export default function Upload() {
  const [uploadImg, setUploadImg] = useState<File | null>();
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<UploadForm>({ mode: "onChange" });
  const { marketplaceContract, nftContract, accountOrigin } = useWeb3();

  // handlesubmit 시 작동하는 함수 두가지
  const onSubmit = async (data: UploadForm) => {
    setIsModal(false);
    setShowProgress(true);
    const { name, description, count, price } = data;
    const form = new FormData();
    form.append("image", data.image);
    form.append("name", name);
    form.append("description", description);
    form.append("count", count.toString());
    form.append("price", price.toString());

    const response = await axios.post("/api/posts/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { imageHash, ipfsHash } = response.data.data;

    if (!nftContract) return;
    const mintResponse = await nftContract.mint(
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    );

    const mintId = await nftContract.tokenCount();

    const { from, to, hash } = mintResponse;

    const postResponse = await axios.post(
      "/api/posts",
      {
        from,
        to,
        hash,
        ipfsHash,
        imageHash,
        name,
        description,
        count,
        price,
        mintId: Number(mintId) + 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (postResponse.data.success) {
      resetForm();
      await router.push(`/posts/${ipfsHash}`);
    }
  };

  const resetForm = () => {
    reset();
    setUploadImg(null);
  };

  const onNotValid = (errors: FieldErrors) => console.log(errors);

  // image 업로드 시 동작하는 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const files = e.target?.files;
    if (files && files.length > 0) {
      setUploadImg(files.item(0));
      setValue("image", files.item(0)!);
    }
  };
  const [defaultValue, setDefaultValue] = useState<number>();
  const handleDisableValue = () => {
    if (defaultValue === undefined) setDefaultValue(1);
    else setDefaultValue(undefined);
  };

  const [priceValue, setPriceValue] = useState<number>();
  const handleValueChange = (event: any) => {
    const value = event.target.value;
    setPriceValue(value);
  };

  const [isModal, setIsModal] = useState<boolean>(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(true);
  };

  return (
    <Layout>
      {showProgress && <ProgressLoading />}
      <form
        // onSubmit={handleSubmit(onSubmit, onNotValid)}
        className="px-5 grid-cols-1 grid w-full mx-auto space-y-8 my-8"
      >
        <h1 className="text-4xl font-bold">Create New Item</h1>
        {/* 아직 불러온 이미지가 없을 경우 */}
        {!uploadImg ? (
          <div>
            <input
              {...register("image", { required: true })}
              className="hidden"
              name="input"
              id="input-upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <label
              htmlFor="input-upload"
              className="flex flex-col mx-auto justify-center text-center border-2 border-violet-200 rounded-2xl py-4"
            >
              <p className="font-bold text-2xl">Upload File</p>
              <p className="opacity-50 my-4">
                {`Accepted file types (JPG, PNG, MOV, MP4, GIF)`}
                <br />
                Max upload size 30MB
              </p>
              <span className="mx-auto bg-violet-300 px-6 py-1 rounded-2xl text-white hover:bg-violet-600 hover:cursor-pointer">
                + Add File
              </span>
            </label>
          </div>
        ) : (
          // 불러온 이미지가 있을 경우
          <div className="relative w-full aspect-square bg-gray-100">
            <Image
              className="object-contain"
              src={URL.createObjectURL(uploadImg)}
              alt="local file"
              fill
            />
          </div>
        )}
        <div>
          <label
            htmlFor="input-name"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            className="border-2 border-gray-300 rounded-xl w-full"
            id="input-name"
            type="text"
            placeholder="Item Name"
          />
        </div>
        <div>
          <label
            htmlFor="input-desc"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Description
          </label>
          <p>
            {`The description will be included on the item's detail page
            underneath its image`}{" "}
            <span className="text-sm text-gray-700">{`(maximum 50 characters allows)`}</span>
          </p>
          <input
            {...register("description", { required: true })}
            className="border-2 border-gray-300 rounded-xl w-full"
            id="input-desc"
            type="text"
            placeholder="Provide a detailed description of your item."
            maxLength={50}
          />
        </div>
        <div>
          <label
            htmlFor="input-price"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Number of copies
          </label>
          <input
            {...register("count", { required: true })}
            className="border-2 border-gray-300 rounded-xl w-full appearance-none"
            id="input-price"
            type="number"
            value={defaultValue}
            onFocus={handleDisableValue}
            placeholder="Enter number of copies you want to create"
          />
        </div>
        <div>
          <label
            htmlFor="input-price"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Price
          </label>
          <div className="relative">
            <input
              {...register("price", { required: true })}
              className="border-2 border-gray-300 rounded-xl w-full appearance-none"
              id="input-price"
              type="number"
              step={0.000001}
              placeholder="Enter price for one piece.         ex) 0.000134"
              onChange={handleValueChange}
            />
            {priceValue ? (
              <span className="absolute top-0 right-0 mt-[10px] mr-3 text-violet-500">
                GoerliETH
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <button
          className={cls(
            "flex items-center justify-center px-6 py-1 rounded-full text-white transition-colors duration-500 w-2/3 mx-auto h-10",
            isValid
              ? "bg-violet-600 cursor-pointer opacity-70"
              : "pointer-events-none bg-gray-500 opacity-50"
          )}
          onClick={openModal}
        >
          Upload
        </button>
        {isModal && (
          <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full">
            <div className="w-full h-full bg-black opacity-50"></div>
            <div className="absolute max-w-[400px] w-[80%] h-[300px] bg-white shadow-lg border p-4 flex flex-col justify-between">
              <h1 className="text-center text-xl font-black">
                Continue Minting
              </h1>
              <div className="flex flex-col h-full justify-around text-gray-500">
                <div>
                  <div className="flex justify-between">
                    <span className="font-semibold">name :</span>
                    <span className="text-violet-400 font-semibold">
                      {getValues("name")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">description : </span>
                    <span className="text-violet-400 font-semibold text-right">
                      {getValues("description")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">count : </span>
                    <span className="text-violet-400 font-semibold">
                      {getValues("count")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">price : </span>
                    <span className="text-violet-400 font-semibold">
                      {getValues("price")} GoerliETH
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-black">
                    해당 정보로 NFT를 생성하시겠습니까?
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="hover:shadow-xl px-4 py-1 font-semibold border-1"
                  onClick={() => setIsModal(false)}
                >
                  취소하기
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="hover:shadow-xl hover:bg-violet-600 px-4 py-1 font-semibold bg-violet-400 text-white "
                >
                  민팅하기
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </Layout>
  );
}
