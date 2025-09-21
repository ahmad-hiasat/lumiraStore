import Search from "@/shard/Search/Search"
import bg from "../../../public/homePage/heroSection/heroSection.jpg"
const HeroSection = () => {
  return (
    <header
    className="h-[80vh] py-[60px]   bg-cover bg-center overlord relative"
    style={{ backgroundImage: `url(${bg.src})`}}
      aria-label="Hero Section">
        <div className="container relative z-40 h-full flex flex-col justify-center m-auto bg">
          <div className="div md:w-[80%] lg:w-[60%]">
            <span className="text-white">Learn about Alibaba.com</span>
            <h1 className="text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] mb-8 mt-4 text-white">The leading B2B ecommerce platform for global trade</h1>
            <Search/>
          </div>
          <div className="div"></div>
        </div>
    </header>
  )
}

export default HeroSection