"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchAddProducts } from "@/features/Products/ProductsThunks";
import { IoClose } from "react-icons/io5";

const AddProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.products);
  const [Active, setActive] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    desc: "",
    img: "",
    count: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(null); 
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.price.trim() ||
      !formData.desc.trim() ||
      !formData.img.trim() ||
      !formData.count.trim()
    ) {
      setFormError("⚠️ يجب ملء جميع الحقول قبل الإرسال!");
      return;
    }

    setFormError(null);

    dispatch(
      fetchAddProducts({
        title: formData.title,
        price: Number(formData.price),
        desc: formData.desc,
        img: formData.img,
        count: Number(formData.count),
      })
    );

    setFormData({
      title: "",
      price: "",
      desc: "",
      img: "",
      count: "",
    });
  };

  return (
    <div>
      <h2 onClick={()=>{setActive(true)}} className="mb-8 w-fit cursor-pointer text-2xl font-bold underline">Add Products</h2>

      <div className={`${Active ? "fixed" : "hidden"} model  fixed w-full z-50 m-auto h-full bg-[#0000006b] top-0 left-0 flex items-center justify-center`}>
        <div className="relative w-[60%] h-[70%] pt-16 rounded-md bg-white p-6">
          <div className="absolute top-4 right-3" onClick={()=>setActive(false)}><IoClose className="text-3xl cursor-pointer" /></div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="اسم المنتج"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="السعر"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="desc"
              placeholder="الوصف"
              value={formData.desc}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="img"
              placeholder="رابط الصورة (CDN أو أي موقع)"
              value={formData.img}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="count"
              placeholder="الكمية المتاحة"
              value={formData.count}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            {/* رسالة الخطأ لو الحقول ناقصة */}
            {formError && <p className="text-red-600 text-sm">{formError}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 cursor-pointer text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              disabled={
                loading ||
                !formData.title.trim() ||
                !formData.price.trim() ||
                !formData.desc.trim() ||
                !formData.img.trim() ||
                !formData.count.trim()
              }
            >
              {loading ? "جاري الإضافة..." : "إضافة المنتج"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
