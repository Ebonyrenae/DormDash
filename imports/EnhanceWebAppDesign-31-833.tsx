import svgPaths from "./svg-81xve1y8fp";
import imgContainer from "figma:asset/84b7c909a9a9fd396b01d7e928040f7f1cf63f2b.png";

function Heading() {
  return (
    <div className="h-[53.993px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[54px] left-0 not-italic text-[#101828] text-[36px] top-[0.56px] tracking-[0.3691px]">Post a New Job</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[27.005px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#4a5565] text-[18px] top-[0.78px] tracking-[-0.4395px]">Describe what you need help with and connect with talented students</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.995px] h-[154.097px] items-start left-[32px] pb-[0.556px] pt-[32.552px] px-[32.552px] rounded-[16px] top-[47.99px] w-[832.005px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.507deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_21_811)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V10" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H10.0083" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_21_811">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#1c398e] text-[14px] top-[0.22px] tracking-[-0.1504px]">Tips for posting a great job</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1447e6] text-[13px] top-[0.22px] tracking-[-0.0762px] w-[751px] whitespace-pre-wrap">Be specific about what you need, set a fair price, and include any relevant details or requirements. Clear job posts get better responses!</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[64.991px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.993px] items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex gap-[11.997px] h-[98.099px] items-start left-[32px] pb-[0.556px] pt-[16.554px] px-[16.554px] rounded-[14px] top-[242.09px] w-[832.005px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon />
      <Container3 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Job Title *</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="h-[47.604px] relative rounded-[14px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[15px] text-[rgba(10,10,10,0.5)] tracking-[-0.2344px]">e.g., Help with React Assignment</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-[0.67px] tracking-[-0.0762px]">Write a clear, specific title that describes what you need</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[103.602px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <TextInput />
      <Paragraph3 />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Category *</p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-313.21px] size-0 top-[-652.82px]" data-name="Option" />;
}

function Option1() {
  return <div className="absolute left-[-313.21px] size-0 top-[-652.82px]" data-name="Option" />;
}

function Option2() {
  return <div className="absolute left-[-313.21px] size-0 top-[-652.82px]" data-name="Option" />;
}

function Option3() {
  return <div className="absolute left-[-313.21px] size-0 top-[-652.82px]" data-name="Option" />;
}

function Option4() {
  return <div className="absolute left-[-313.21px] size-0 top-[-652.82px]" data-name="Option" />;
}

function Option5() {
  return <div className="absolute left-[-313.21px] size-0 top-[-652.82px]" data-name="Option" />;
}

function Option6() {
  return <div className="absolute left-[-313.21px] size-0 top-[-652.82px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="bg-white h-[47.604px] relative rounded-[14px] shrink-0 w-full" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
      <Option4 />
      <Option5 />
      <Option6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[78.099px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Dropdown />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Description *</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="h-[160.104px] relative rounded-[14px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] not-italic relative shrink-0 text-[15px] text-[rgba(10,10,10,0.5)] tracking-[-0.2344px]">Provide details about what you need help with, any specific requirements, and what the helper should know...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-[0.67px] tracking-[-0.0762px]">Include all relevant details to help students understand the job</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[222.318px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <TextArea />
      <Paragraph4 />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Payment Type *</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f0fdf4] flex-[1_0_0] h-[48.325px] min-h-px min-w-px relative rounded-[14px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#29ac3d] border-[1.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[91.12px] not-italic text-[#29ac3d] text-[14px] text-center top-[13.89px] tracking-[-0.1504px]">Fixed Price</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48.325px] min-h-px min-w-px relative rounded-[14px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[91.7px] not-italic text-[#4a5565] text-[14px] text-center top-[13.89px] tracking-[-0.1504px]">Hourly Rate</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[48.325px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[11.997px] items-start relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.995px] h-[103.602px] items-start left-0 top-0 w-[375.451px]" data-name="Container">
      <Label3 />
      <Container9 />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Fixed Price *</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="absolute h-[47.604px] left-0 rounded-[14px] top-0 w-[375.451px]" data-name="Number Input">
      <div className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[15px] text-[rgba(10,10,10,0.5)] tracking-[-0.2344px]">25</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[13.8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[47.604px] relative shrink-0 w-full" data-name="Container">
      <NumberInput />
      <Icon1 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-[0.67px] tracking-[-0.0762px]">Set a fair price based on complexity and time needed</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.995px] h-[103.602px] items-start left-[391.45px] top-0 w-[375.451px]" data-name="Container">
      <Label4 />
      <Container11 />
      <Paragraph5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[103.602px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container10 />
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Location *</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute h-[47.604px] left-0 rounded-[14px] top-0 w-[375.451px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[15px] text-[rgba(10,10,10,0.5)] tracking-[-0.2344px]">e.g., Remote or Library - 3rd Floor</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[13.8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p26ddc800} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[47.604px] relative shrink-0 w-full" data-name="Container">
      <TextInput1 />
      <Icon2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.995px] h-[78.099px] items-start left-0 top-0 w-[375.451px]" data-name="Container">
      <Label5 />
      <Container14 />
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Deadline *</p>
    </div>
  );
}

function DatePicker() {
  return <div className="absolute border-[#e5e7eb] border-[0.556px] border-solid h-[47.604px] left-0 rounded-[14px] top-0 w-[375.451px]" data-name="Date Picker" />;
}

function Icon3() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[13.8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_21_816)" id="Icon">
          <path d="M10 5V10L13.3333 11.6667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14d24500} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_21_816">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[47.604px] relative shrink-0 w-full" data-name="Container">
      <DatePicker />
      <Icon3 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.995px] h-[78.099px] items-start left-[391.45px] top-0 w-[375.451px]" data-name="Container">
      <Label6 />
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[78.099px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container15 />
    </div>
  );
}

function Label7() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Required Skills (Optional)</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="absolute h-[47.604px] left-0 rounded-[14px] top-0 w-[766.901px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[15px] text-[rgba(10,10,10,0.5)] tracking-[-0.2344px]">e.g., React, JavaScript, Debugging</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pe6b10c0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p4c21d00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[47.604px] relative shrink-0 w-full" data-name="Container">
      <TextInput2 />
      <Icon4 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-[0.67px] tracking-[-0.0762px]">Separate multiple skills with commas</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[103.602px] items-start relative shrink-0 w-full" data-name="Container">
      <Label7 />
      <Container18 />
      <Paragraph6 />
    </div>
  );
}

function Label8() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#101828] text-[15px] top-[-0.78px] tracking-[-0.2344px]">Attachments (Optional)</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[363.45px] size-[40px] top-[33.66px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1093e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p19d51e80} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p117ebd90} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[20.998px] left-[33.66px] top-[85.66px] w-[699.575px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[349.62px] not-italic text-[#29ac3d] text-[0px] text-[14px] text-center top-[0.22px] tracking-[-0.1504px]">
        <span className="leading-[21px]">Click to upload</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] text-[#4a5565]">{` or drag and drop`}</span>
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[17.995px] left-[33.66px] top-[110.65px] w-[699.575px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[349.86px] not-italic text-[#6a7282] text-[12px] text-center top-[0.67px]">PNG, JPG, PDF up to 10MB</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#f9fafb] h-[162.309px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon5 />
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[7.995px] h-[192.804px] items-start relative shrink-0 w-full" data-name="Container">
      <Label8 />
      <Container20 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#29ac3d] flex-[1_0_0] h-[51.979px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[315.69px] not-italic text-[16px] text-center text-white top-[13.22px] tracking-[-0.3125px]">Post Job</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[55.313px] relative rounded-[14px] shrink-0 w-[119.418px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[60.16px] not-italic text-[#4a5565] text-[16px] text-center top-[14.88px] tracking-[-0.3125px]">Cancel</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[15.998px] h-[71.311px] items-center relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Form() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[23.993px] h-[1186.493px] items-start left-[32px] pb-[0.556px] pt-[32.552px] px-[32.552px] rounded-[16px] top-[372.19px] w-[832.005px]" data-name="Form">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Container12 />
      <Container17 />
      <Container19 />
      <Container21 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27.005px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#101828] text-[18px] top-[0.78px] tracking-[-0.4395px]">💡 Pricing Guide</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#29ac3d] text-[13px] top-[0.67px] tracking-[-0.0762px]">Simple Tasks</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#4a5565] text-[13px] top-[0.67px] tracking-[-0.0762px]">$15-$30 • Quick questions, basic help</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[43.003px] items-start left-0 top-0 w-[250.304px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#29ac3d] text-[13px] top-[0.67px] tracking-[-0.0762px]">Moderate Tasks</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#4a5565] text-[13px] top-[0.67px] tracking-[-0.0762px]">$30-$60 • Tutoring, project help</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[43.003px] items-start left-[266.3px] top-0 w-[250.304px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#29ac3d] text-[13px] top-[0.67px] tracking-[-0.0762px]">Complex Tasks</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[19.505px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#4a5565] text-[13px] top-[0.67px] tracking-[-0.0762px]">$60+ • Full projects, expert work</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[43.003px] items-start left-[532.6px] top-0 w-[250.304px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[43.003px] relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.997px] h-[131.102px] items-start left-[32px] pb-[0.556px] pt-[24.549px] px-[24.549px] rounded-[16px] top-[1590.68px] w-[832.005px]" data-name="Container" style={{ backgroundImage: "linear-gradient(171.045deg, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading1 />
      <Container23 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[1769.774px] left-[248.66px] top-[89.99px] w-[895.998px]" data-name="Container">
      <Container1 />
      <Container2 />
      <Form />
      <Container22 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[89.991px] left-0 opacity-10 top-0 w-[1393.333px]" data-name="Container">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[66.67%] left-0 max-w-none top-0 w-[4.31%]" src={imgContainer} />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[42.005px] relative shrink-0 w-[200.182px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[42px] left-0 not-italic text-[28px] text-white top-[-0.11px] tracking-[0.3828px]">🏃‍💨 DormDash</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[81.033px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-[-0.78px] tracking-[-0.3125px]">Dashboard</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[94.661px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-[-0.78px] tracking-[-0.3125px]">Browse Jobs</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[191.693px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[15.998px] items-center relative size-full">
        <Link1 />
        <Link2 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex h-[42.005px] items-center justify-between left-[88.66px] top-[23.99px] w-[1216.007px]" data-name="Container">
      <Link />
      <Navigation />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-gradient-to-b from-[#29ac3d] h-[89.991px] left-0 overflow-clip shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] to-[#1e8f32] top-0 via-1/2 via-[#2bc947] w-[1393.333px]" data-name="Header">
      <Container27 />
      <Container28 />
    </div>
  );
}

export default function EnhanceWebAppDesign() {
  return (
    <div className="relative size-full" data-name="Enhance Web App Design" style={{ backgroundImage: "linear-gradient(126.83deg, rgb(249, 250, 251) 0%, rgb(255, 255, 255) 50%, rgb(240, 253, 244) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container />
      <Header />
    </div>
  );
}