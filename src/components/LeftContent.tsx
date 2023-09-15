import Image from "next/image";
import img from "../assets/img/checked 1.png";

const LeftContent = () => {
  return (
    <div>
      <h2 className="text-[34px] text-[#333] font-medium lg:text-[46px]">
        Self Help Basic ($29/month)
      </h2>
      <h2 className="text-[25px] mt-0 font-semibold pt-0 text-[#0967AF] lg:text-[36px]">
        Alcohol Program
      </h2>
      <h2 className="text-[25px] mt-[48px] mb-3 pt-0 text-[#333] lg:text-[36px]">
        Here&rsquo;s what you get
      </h2>

      <div className="space-y-[18px]">
        <div className="flex items-center gap-[18px]">
          <Image src={img} alt="" />
          <p className="text-[18px] text-[#666]">
            {" "}
            <b>Structured online program</b> with 8 comprehensive modules and
            over 50 thought-provoking exercises
          </p>
        </div>
        <div className="flex items-center gap-[18px]">
          <Image src={img} alt="" />
          <p className="text-[18px] text-[#666]">
            {" "}
            <b>Developed by Dr. Stanton Peele</b> the world leading authority on
            non-12 step addiction recovery
          </p>
        </div>
        <div className="flex items-center gap-[18px]">
          <Image src={img} alt="" />
          <p className="text-[18px] text-[#666]">
            {" "}
            <b> Private video coaching – </b>option to schedule one-to-one
            coaching through our secure online video conferencing application
          </p>
        </div>
        <div className="flex items-center gap-[18px]">
          <Image src={img} alt="" />
          <p className="text-[18px] text-[#666]">
            {" "}
            <b> Life Story Journaling -</b> to try the ENTIRE program so you can
            decide for yourself if it is for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
