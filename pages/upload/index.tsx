//To-do
// 1. 이미지 클릭하면 이미지 업로드하기
// 2. 이미지 업로드하는 버튼 따로 만들기
// 3. 이미지 업로드 화면에 업로드한 이미지 사진 띄우기
// 4.

import { useState, useRef, Fragment } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function index() {
  return (
    <Layout>
      <div className="px-5">
        <h1 className="text-4xl font-bold my-8">Create New Item</h1>
        <div>
          <input
            className="hidden"
            name="input"
            id="input-upload"
            type="file"
            accept="image/*"
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
        <div className="my-8">
          <label
            htmlFor="input-name"
            className="font-bold hover:cursor-pointer text-lg"
          >
            Name
          </label>
          <input
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
            Price
          </label>
          <input
            className="border-2 border-gray-300 rounded-xl w-full"
            id="input-price"
            type="text"
            placeholder="Enter price for one piece"
          />
        </div>
      </div>
    </Layout>
  );
}
