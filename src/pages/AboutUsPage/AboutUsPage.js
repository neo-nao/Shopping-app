import { useEffect, useRef, useState } from "react";
import {
  AboutUsPageLargeContainer,
  AboutUsContainer,
  AboutUsBox,
  ImageContainer,
  DescriptionContainer,
  SlideButton,
} from "../../styles/Elements/AboutUsElements";
import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import { LogoNoLink } from "../../components/common/Logo/Logo";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const slideDatas = [
  {
    id: 1,
    title: "first slide title",
    paragraph: "first slide paragraph",
    image: LogoNoLink,
  },
  {
    id: 2,
    title: "second slide title",
    paragraph: "second slide paragraph",
    image: LogoNoLink,
  },
  {
    id: 3,
    title: "third slide title",
    paragraph: "third slide paragraph",
    image: LogoNoLink,
  },
  {
    id: 4,
    title: "fourth slide title",
    paragraph: "fourth slide paragraph",
    image: LogoNoLink,
  },
];

const PageElements = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const titleRef = useRef();
  const paragraphRef = useRef();

  const isLastSlide = slideIndex === slideDatas.length - 1;

  const handleSlideButton = (action) => {
    titleRef.current.style.visibility = "hidden";
    paragraphRef.current.style.visibility = "hidden";
    titleRef.current.style.transition = "none";
    paragraphRef.current.style.transition = "none";
    titleRef.current.classList.remove("text-active");
    paragraphRef.current.classList.remove("text-active");
    switch (action) {
      case "next":
        !isLastSlide && setSlideIndex(slideIndex + 1);
        break;
      case "previous":
        slideIndex > 0 && setSlideIndex(slideIndex - 1);
        break;
      default:
        console.log("slide action not valid");
    }
  };

  useEffect(() => {
    if (titleRef.current && paragraphRef.current) {
      setTimeout(() => {
        titleRef.current.style = "";
        paragraphRef.current.style = "";
        titleRef.current.classList.add("text-active");
        paragraphRef.current.classList.add("text-active");
      }, 150);
    }
  }, [slideIndex]);

  return (
    <AboutUsContainer>
      <AboutUsBox>
        <section className="image-section">
          <ImageContainer>{slideDatas[slideIndex].image}</ImageContainer>
        </section>
        <DescriptionContainer>
          <section className="description-section">
            <h1 className="about-us-title" ref={titleRef}>
              {slideDatas[slideIndex].title}
            </h1>
            <p className="about-us-paragraph" ref={paragraphRef}>
              {slideDatas[slideIndex].paragraph}
            </p>
          </section>
          <section className="slide-handle-buttons">
            <SlideButton
              onClick={() => handleSlideButton("previous")}
              disabled={slideIndex === 0 ? true : false}
            >
              <MdArrowBackIosNew />
            </SlideButton>
            <SlideButton
              onClick={() => handleSlideButton("next")}
              disabled={isLastSlide ? true : false}
            >
              <MdArrowForwardIos />
            </SlideButton>
          </section>
        </DescriptionContainer>
      </AboutUsBox>
    </AboutUsContainer>
  );
};

const AboutUsPage = () => {
  return (
    <>
      {window.innerWidth <= 800 ? (
        <FullPageHeight>
          <PageElements />
        </FullPageHeight>
      ) : (
        <AboutUsPageLargeContainer>
          <AboutUsContainer>
            <PageElements />
          </AboutUsContainer>
        </AboutUsPageLargeContainer>
      )}
    </>
  );
};

export default AboutUsPage;
