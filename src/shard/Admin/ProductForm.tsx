"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ProductFormProps {
  mode: "add" | "edit";
  initialData?: {
    _id?: string;
    title?: string;
    price?: number;
    desc?: string;
    img?: string;
    count?: number;
  };
  onSubmitAction: (data: {
    _id?: string;
    title: string;
    price: number;
    desc: string;
    img: string;
    count: number;
  }) => Promise<void>;
  loading: boolean;
  error: string | null;
  externalOpen?: boolean;
  onCloseExternal?: () => void;
}

export default function ProductForm({
  mode,
  initialData,
  onSubmitAction,
  loading,
  error,
  externalOpen,
  onCloseExternal,
}: ProductFormProps) {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    desc: "",
    img: "",
    count: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        price: initialData.price?.toString() || "",
        desc: initialData.desc || "",
        img: initialData.img || "",
        count: initialData.count?.toString() || "",
      });
    }
  }, [initialData, mode]);

  useEffect(() => {
    if (typeof externalOpen === "boolean") {
      setActive(externalOpen);
    }
  }, [externalOpen]);

  const closeModal = () => {
    onCloseExternal?.();
    setActive(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, desc, img, count } = formData;

    if (title.trim().length < 5) {
      setFormError("⚠️ the title shuiled be min 5 litters ");
      return;
    }
    if (desc.trim().length < 10) {
      setFormError("⚠️the descraption shuiled be min 10 litters");
      return;
    }
    if (!price.trim() || !img.trim() || !count.trim()) {
      setFormError("⚠️  all inputs is requred");
      return;
    }

    await onSubmitAction({
      _id: initialData?._id,
      title: title.trim(),
      price: Number(price),
      desc: desc.trim(),
      img: img.trim(),
      count: Number(count),
    });

    if (mode === "add") {
      setFormData({ title: "", price: "", desc: "", img: "", count: "" });
    }
  };

  return (
    <div>
      <div
        className={`${active ? "fixed" : "hidden"} w-full h-full bg-[#0000006b] top-0 left-0 flex items-center justify-center`}
      >
        <div className="relative z-40 w-[60%] max-h-[90vh] overflow-auto rounded-md bg-white p-8">
          <div className="absolute w-fit top-4 right-3" onClick={closeModal}>
            <IoClose className="text-3xl text-black cursor-pointer" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col pt-8 gap-4">
            <input
              type="text"
              name="title"
              placeholder="title"
              minLength={5}
              value={formData.title}
              onChange={handleChange}
              className="border border-black text-black p-2 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-black text-black p-2 rounded"
            />
            <input
              type="text"
              name="desc"
              placeholder="des"
              minLength={10}
              value={formData.desc}
              onChange={handleChange}
              className="border border-black text-black p-2 rounded"
            />
            <input
              type="text"
              name="img"
              placeholder="Image Link"
              value={formData.img}
              onChange={handleChange}
              className="border border-black text-black p-2 rounded"
            />
            <input
              type="number"
              name="count"
              placeholder="count"
              value={formData.count}
              onChange={handleChange}
              className="border border-black text-black p-2 rounded"
            />

            {formError && <p className="text-red-600 text-sm">{formError}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? " loading too add ..." : " add product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
