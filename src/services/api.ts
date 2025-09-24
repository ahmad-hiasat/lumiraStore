import { ActivateData, AddCartPayload, ChangePasswordData, ChangePasswordDataOtp, IAddProduct, LoginData, SignupData } from "@/types/type";
const BASE_URL =  process.env.NEXT_PUBLIC_BASE_URL

// register
export async function signup(data: SignupData) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  const text = await res.text()
  if (!res.ok) throw new Error(text || "فشل في التسجيل")
  const token = res.headers.get("Authorization");
    return {
    message: text,
    token: token || null
  }; 
}
// activate
export async function activate(data: ActivateData) {
  const res = await fetch(`${BASE_URL}/users/register/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "فشل في التفعيل")
  }
  return await res.json()
}
// reset code
export async function resentCode(data: {email:string}) {
  const res = await fetch(`${BASE_URL}/resentcode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "فشل في تسجيل الدخول")
  }

  return await res.text()
}
// login
export async function login(data: LoginData) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "فشل في تسجيل الدخول")
  }

  return await res.json()
}
// change password
export async function changePassword(data: ChangePasswordData) {
  const res = await fetch(`${BASE_URL}/users/reset/forgetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "فشل في تسجيل الدخول")
  }

  return await res.text()
}
// forgetpassword otp
export async function changePasswordOtp(data: ChangePasswordDataOtp) {
  const res = await fetch(`${BASE_URL}/users/reset/forgetPassword/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "فشل في تسجيل الدخول")
  }

  return await res.text()
}
// user data
export async function userApi() {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التحميل");
  }
  return res.json();
}
// logout 
export async function logoutApi() {
  const res = await fetch(`${BASE_URL}/users/logout`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التحميل");
  }
  return res.json();
}
// products
export async function productApi() {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التحميل");
  }

  return res.json();
}
// single product
export async function SingleProductApi(id:string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التحميل");
  }

  return res.json();
}

// Add products
export async function AddProductsApi(data: Omit<IAddProduct, "_id">) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل في إضافة المنتج");
  }
  return (await res.json()) as IAddProduct;
}
// Add Cart
export async function AddCartApi(data:AddCartPayload) {
  const res = await fetch(`${BASE_URL}/orders/addToCart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل في إضافة المنتج");
  }
  return await res.text()
}
// get cart

export async function getCartApi() {
  const res = await fetch(`${BASE_URL}/orders/getCart`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التحميل");
  }

  return await res.json(); 
}
// delete
export async function deleteCartApi(productId: string) {
  const res = await fetch(`${BASE_URL}/orders/removeFromCart/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في حذف المنتج");
  }

  return res.json(); 
}

// delete all
export async function deleteAllCartApi() {
  const res = await fetch(`${BASE_URL}/orders/removeAllFromCart`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في حذف السلة بالكامل");
  }

  return res.json(); 
}
// delete product admin
export async function deleteProductApi(productId: string) {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في حذف المنتج");
  }

  return res.json(); 
}
//requestResetId
export async function requestResetId(email: string) {
  const res = await fetch(`${BASE_URL}/users/reset/getId`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في إرسال البريد الإلكتروني");
  }

  return res.json();
}

// verifyOtpApi
export async function verifyOtpApi({
  id,
  otp,
}: {
  id: string | number;
  otp: number;
}) {
  const res = await fetch(`${BASE_URL}/users/reset/forgetPassword/otp/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otp }),
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التحقق من الكود");
  }

  return res.json();
}
// resetPasswordApi

export async function resetPasswordApi({ id, password }: { id: string | number; password: string }) {
  const url = `${BASE_URL}/users/enterPassword/${id}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في تغيير كلمة المرور");
  }

  return res.json();
}
// searchProductsApi
export async function searchProductsApi(title: string) {
  const res = await fetch(`${BASE_URL}/products/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل في البحث");
  }

  return await res.json();
}

// Currency

export async function getCurrencyApi() {
  const res = await fetch(`${BASE_URL}/Currency`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التحميل");
  }

  return await res.json(); 
}

// updateProductApi
export async function updateProductApi(
  id: string,
  updates: Partial<{ title: string; price: number; desc: string; img: string; count: number }>
) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في التعديل");
  }

  return await res.json();
}
// checkout 
export async function buyOrderApi() {
  const res = await fetch(`${BASE_URL}/orders/buyOrder`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "فشل في إتمام الطلب");
  }

  return await res.json();
}


