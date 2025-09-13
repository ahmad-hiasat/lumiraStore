import Search from "@/shard/Search/Search"
import bg from "../../../public/homePage/heroSection/heroSection.jpg"
const HeroSection = () => {
  return (
    <header
    className="h-[60vh]   bg-cover bg-center"
    style={{ backgroundImage: `url(${bg.src})`}}
      aria-label="Hero Section">
        <div className="container h-full flex flex-col justify-center m-auto bg">
          <div className="div w-[60%]">
            <span className="text-white">Learn about Alibaba.com</span>
            <h1 className="text-4xl mb-8 mt-4 text-white">The leading B2B ecommerce platform for global trade</h1>
            <Search/>
          </div>
          <div className="div"></div>
        </div>
    </header>
  )
}

export default HeroSection