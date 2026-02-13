import svgPaths from "./svg-ddm1he1tln";

function Icon() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M5.33333 16H26.6667" id="Vector" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M5.33333 8H26.6667" id="Vector_2" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M5.33333 24H26.6667" id="Vector_3" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-center left-[60px] top-[55px]" data-name="Button">
      <Icon />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[64px] left-[750px] top-[137px] w-[226.594px]" data-name="Heading 1">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[64px] left-0 not-italic text-[#29ac3d] text-[56px] top-0">Settings</p>
    </div>
  );
}

function Container() {
  return <div className="absolute bg-[rgba(0,0,0,0.25)] h-px left-0 top-[334px] w-[1728px]" data-name="Container" />;
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[63px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 63">
        <g id="Icon">
          <path d={svgPaths.p2f7a4100} id="Vector" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.5625" />
          <path d={svgPaths.p56ae080} id="Vector_2" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[22369600px] shrink-0 size-[126px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[66px] left-0 not-italic text-[44px] text-black top-0">Jane Doe</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[42px] left-0 not-italic text-[#6a7282] text-[28px] top-0">janedoe@university.edu</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[114px] relative shrink-0 w-[316.552px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[38px] h-[126px] items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white h-[236px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[55px] px-[55px] relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[56px] left-0 not-italic text-[38px] text-black top-[-0.33px]">Account Settings</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p270c2400} id="Vector" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d={svgPaths.p3c5c26f0} id="Vector_2" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[22369600px] shrink-0 size-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[47px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[47px] left-0 not-italic text-[32px] text-black top-[-0.67px]">Email Address</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[38px] left-0 not-italic text-[#6a7282] text-[25px] top-0">janedoe@university.edu</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] h-[85px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[85px] relative shrink-0 w-[389.146px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[25px] items-center relative size-full">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p12108b80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[167px] relative rounded-[18px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[43px] py-[2px] relative size-full">
          <Container8 />
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p2478cc80} id="Vector" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[22369600px] shrink-0 size-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[47px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[47px] left-0 not-italic text-[32px] text-black top-[-0.67px]">Phone Number</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[38px] left-0 not-italic text-[#6a7282] text-[25px] top-0">+1 (555) 123-4567</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[85px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[85px] relative shrink-0 w-[328.708px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[25px] items-center relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p12108b80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[167px] relative rounded-[18px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[43px] py-[2px] relative size-full">
          <Container11 />
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p3b880bf0} id="Vector" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d={svgPaths.pe95f80} id="Vector_2" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d={svgPaths.p12fdb340} id="Vector_3" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d="M15.8333 9.5H22.1667" id="Vector_4" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d="M15.8333 15.8333H22.1667" id="Vector_5" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d="M15.8333 22.1667H22.1667" id="Vector_6" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d="M15.8333 28.5H22.1667" id="Vector_7" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[22369600px] shrink-0 size-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[47px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[47px] left-0 not-italic text-[32px] text-black top-[-0.67px]">University</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[38px] left-0 not-italic text-[#6a7282] text-[25px] top-0">University at Buffalo</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[85px] relative shrink-0 w-[242.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[85px] relative shrink-0 w-[343.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[25px] items-center relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p12108b80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[167px] relative rounded-[18px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[43px] py-[2px] relative size-full">
          <Container14 />
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] h-[551px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] h-[632px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container7 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[56px] left-0 not-italic text-[38px] text-black top-[-0.33px]">Preferences</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.paa72d00} id="Vector" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d={svgPaths.p18482880} id="Vector_2" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[22369600px] shrink-0 size-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[47px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[47px] left-0 not-italic text-[32px] text-black top-[-0.67px]">Notifications</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[38px] left-0 not-italic text-[#6a7282] text-[25px] top-0">Manage your notification preferences</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[85px] relative shrink-0 w-[447.552px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[85px] relative shrink-0 w-[548.552px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[25px] items-center relative size-full">
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p12108b80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[167px] relative rounded-[18px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[43px] py-[2px] relative size-full">
          <Container19 />
          <Icon9 />
        </div>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p23f96a00} id="Vector" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d={svgPaths.p31539100} id="Vector_2" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[22369600px] shrink-0 size-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[47px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[47px] left-0 not-italic text-[32px] text-black top-[-0.67px]">{`Privacy & Security`}</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[38px] left-0 not-italic text-[#6a7282] text-[25px] top-0">Control your privacy settings</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] h-[85px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[85px] relative shrink-0 w-[446.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[25px] items-center relative size-full">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p12108b80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[167px] relative rounded-[18px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[43px] py-[2px] relative size-full">
          <Container22 />
          <Icon11 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] h-[359px] items-start relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] h-[440px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container18 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[56px] left-0 not-italic text-[38px] text-black top-[-0.33px]">Support</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p15a75980} id="Vector" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d={svgPaths.p361dc680} id="Vector_2" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d="M19 26.9167H19.0158" id="Vector_3" stroke="var(--stroke-0, #29AC3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[22369600px] shrink-0 size-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[47px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[47px] left-0 not-italic text-[32px] text-black top-[-0.67px]">Help Center</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[38px] left-0 not-italic text-[#6a7282] text-[25px] top-0">FAQs and support articles</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] h-[85px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[85px] relative shrink-0 w-[409.833px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[25px] items-center relative size-full">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p12108b80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[167px] relative rounded-[18px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[43px] py-[2px] relative size-full">
          <Container26 />
          <Icon13 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] h-[248px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Button6 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="Icon">
          <path d={svgPaths.p30a2d480} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d={svgPaths.pbcd0380} id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
          <path d="M33.25 19H14.25" id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.16667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[47px] relative shrink-0 w-[121.073px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[47px] left-[61px] not-italic text-[#fb2c36] text-[32px] text-center top-[-0.67px]">Log Out</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white h-[129px] relative rounded-[18px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[19px] items-center justify-center pl-[2px] pr-[2.01px] py-[2px] relative size-full">
          <Icon14 />
          <Paragraph13 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[1813px] items-start left-[128px] top-[418px] w-[1472px]" data-name="Container">
      <Container2 />
      <Container6 />
      <Container17 />
      <Container25 />
      <Button7 />
    </div>
  );
}

export default function Settings() {
  return (
    <div className="bg-white relative size-full" data-name="settings">
      <Button />
      <Heading />
      <Container />
      <Container1 />
    </div>
  );
}