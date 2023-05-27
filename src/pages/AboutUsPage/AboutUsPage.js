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
import NextDetailList from "./NextDetailList";

const slideDatas = [
  {
    id: 1,
    title: "who are we?",
    paragraph: (
      <>
        <span>
          Next is a new-made brand and E-commerce company creating and selling
          various sort of shoes.
        </span>
        <br />
        <span>
          In next-co we believe quality and consumer satisfaction is our main
          objective and we highly consider delivering the most comfort and
          reliable shoes to our users.
        </span>
      </>
    ),
  },
  {
    id: 2,
    title: "what do we do?",
    paragraph: (
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        dignissim urna eget est malesuada, vel hendrerit justo scelerisque. Nam
        sit amet posuere arcu. a vulputate ipsum. Sed tempus congue nibh, non
        posuere ex varius eu.
      </span>
    ),
  },
  {
    id: 3,
    title: "how is being in next like?",
    paragraph: (
      <span>
        Praesent pretium mauris sit amet auctor faucibus. Ut porttitor ante
        lectus, vitae pharetra nunc vehicula et. Donec massa lacus, vestibulum
        <br />
        eget magna non, condimentum mollis nisl. Nullam dictum accumsan nisl
        dapibus fermentum.
      </span>
    ),
  },
  {
    id: 4,
    title: "contact us",
    paragraph: (
      <>
        <span>
          We are looking forward to get in touch with you, ask us anything you
          want or even give your feedbacks and we're ready to respond 😃
        </span>
        <br />
        <NextDetailList id="inner" />
      </>
    ),
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
        console.error("slide action not valid");
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
          <ImageContainer>
            {LogoNoLink}
            <NextDetailList id="outer" />
          </ImageContainer>
        </section>
        <DescriptionContainer>
          <section className="description-section">
            <h1 className="about-us-title" ref={titleRef}>
              {slideDatas[slideIndex].title}
            </h1>
            <div className="about-us-paragraph" ref={paragraphRef}>
              {slideDatas[slideIndex].paragraph}
            </div>
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
