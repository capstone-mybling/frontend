/**
 * 완료한 목록
 * 1. 전체적인 UI만들기
 * 2. useForm 라이브러리로 변경
 * 3. 이미지 업로드 시 화면에 띄우기
 * 4. required 필드를 채우지 않았을 시, 제출 form 비활성화
 * (해결) Add file 하는 즉시 파일을 받아옴(콘솔확인) 그러나 전체 Form 제출 시 업로드 된 이미지에 대한 정보가 사라짐 -> 아마도 line 68, 74의 순서 때문인 것 같은데 .. 바꾸면 코드가 안돌아감 ㅋ
 *
 * To-do
 * 1. 이미지 업로드 시 화면에 띄워지지만 비율이 짤리는 경우가 발생
 * 2. required 필드를 채우지 않았을 시, 제출 form 비활성화 효과를 주고싶음 (제출버튼 hover시 디자인과 마우스커서가 pointer로 변경되지 않게)
 */

import { useForm, FieldErrors } from "react-hook-form";
import Layout from "@/components/Layout";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

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
  const { register, handleSubmit, reset, setValue } = useForm<UploadForm>();

  // handlesubmit 시 작동하는 함수 두가지
  const onValid = (data: UploadForm) => {
    console.log(data);
    reset();
  };
  const onNotValid = (errors: FieldErrors) => console.log(errors);

  // image 업로드 시 동작하는 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const files = e.target?.files;
    console.log(files);
    if (files && files.length > 0) {
      setUploadImg(files.item(0));
      setValue("image", files.item(0)!);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onValid, onNotValid)} className="px-5">
        <h1 className="text-4xl font-bold my-8">Create New Item</h1>
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
          <div className="relative w-full aspect-square">
            <Image
              className="object-cover"
              src={URL.createObjectURL(uploadImg)}
              alt="local file"
              fill
              sizes="650px"
            />
          </div>
        )}
        <div className="my-8">
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
        <div className="my-8">
          <label
            htmlFor="input-desc"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Description
          </label>
          <p>
            {`The description will be included on the item's detail page
            underneath its image.`}
          </p>
          <input
            {...register("description", { required: true })}
            className="border-2 border-gray-300 rounded-xl w-full"
            id="input-desc"
            type="text"
            placeholder="Provide a detailed description of your item."
          />
        </div>
        <div className="my-8">
          <label
            htmlFor="input-price"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Number of copies
          </label>
          <input
            {...register("count", { required: true })}
            className="border-2 border-gray-300 rounded-xl w-full"
            id="input-price"
            type="number"
            placeholder="Enter number of copies you want to create"
          />
        </div>
        <div className="my-8">
          <label
            htmlFor="input-price"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Price
          </label>
          <input
            {...register("price", { required: true })}
            className="border-2 border-gray-300 rounded-xl w-full"
            id="input-price"
            type="number"
            placeholder="Enter price for one piece"
          />
        </div>
        <input
          className="mx-auto bg-gray-500 opacity-50 px-6 py-1 rounded-2xl text-white hover:bg-violet-600 hover:cursor-pointer hover:opacity-70"
          type="submit"
        />
      </form>
    </Layout>
  );
}
