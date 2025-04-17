import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { withPrefix } from "gatsby"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import { FaArrowUp, FaFilePdf, FaVideo } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { LuTextSelect } from "react-icons/lu";

// Import videos from static directory
const night_results = withPrefix("/videos/vis_results_hydra_r100_val_night.mp4");
const rain_results = withPrefix("/videos/vis_results_hydra_r100_val_rain.mp4");

// Import teaser figure
const teaser_figure = withPrefix("/figs/inference_analysis.png");
const architecture_figure = withPrefix("/figs/architecture_v3.png");

// Import comparison figures
const comp_1 = withPrefix("/figs/comp_1.jpg");
const comp_2 = withPrefix("/figs/comp_2.jpg");
const comp_3 = withPrefix("/figs/comp_3.jpg");
const comp_4 = withPrefix("/figs/comp_4.jpg");
const comp_5 = withPrefix("/figs/comp_5.jpg");
const comp_6 = withPrefix("/figs/comp_6.jpg");
const comp_7 = withPrefix("/figs/comp_7.jpg");
const comp_8 = withPrefix("/figs/comp_8.jpg");

interface TitleProps {
    children: React.ReactNode;
}

interface VenueProps {
    website: string;
    children: React.ReactNode;
}

interface AbstractProps {
    children: React.ReactNode;
}

interface AuthorProps {
    website: string;
    firstAuthor?: boolean;
    affiliations?: string;
    lastAuthor?: boolean;
    children: React.ReactNode;
}

interface AffiliationProps {
    website: string;
    number?: string;
    children: React.ReactNode;
}

interface ActionLinkProps {
    url: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

interface ArticleProps {
    children: React.ReactNode;
}

interface MainProps {
    children: React.ReactNode;
}

interface FewShotResultProps {
    id: string;
    demos: string;
    demos_label: string;
    video: string;
    hidden?: boolean;
    children: React.ReactNode;
}

interface CarouselItemProps {
    video: string;
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
    // Paper title
    return (
        <h1 className="pb-1 mb-5 sm:mb-4 sm:leading-tight md:leading-tight lg:leading-tight font-bold text-center">{children}</h1>
    )
}

const Venue: React.FC<VenueProps> = ({ website, children }) => {
    return (
        <div className="flex flex-wrap justify-center text-2xl lg:text-2xl mb-6 sm:mb-5">
            <a className="no-underline" href={website} target="_blank">{children}</a>
        </div>
    )
}

const Abstract: React.FC<AbstractProps> = ({ children }) => {
    return (
        <div>
            <div className="flex justify-center content-center">
                <p className="font-semibold text-2xl sm:text-3xl m-1 sm:m-2">Abstract</p>
            </div>
            <div className="flex justify-center content-center">
                <p className="text-justify font-light text-base sm:text-lg m-1 sm:m-1 max-w-[100%] sm:max-w-[620px]">{
                    children
                }</p>
            </div>
        </div>
    )
}

const Author: React.FC<AuthorProps> = ({ children, website, firstAuthor, affiliations, lastAuthor }) => {
    return (
        <span className="text-center inline-block">
            <a href={website} target={"_blank"}
                className="font-normal no-underline text-stone-600 hover:underline underline-offset-3 hover:transition-all">
                {children}
            </a>
            {firstAuthor || affiliations ?
                <sup className={"pl-0.5"}>{firstAuthor ?
                    <span className="font-bold">*</span> : null}{affiliations ? affiliations : null}</sup>
                : null}
            {lastAuthor ? null : <>,&nbsp;</>}
        </span>
    )
}

const Affiliation: React.FC<AffiliationProps> = ({ children, website, number }) => {
    return (
        <span className={"text-center inline-block mr-4"}>
            <sup className={"mr-0.5"}>{number}</sup>
            <a href={website} target={"_blank"}
                className="font-light no-underline text-stone-600 hover:underline underline-offset-3 hover:transition-all">
                {children}
            </a>
        </span>
    )
}

const ActionLink: React.FC<ActionLinkProps> = ({ children, url, icon }) => {
    return (
        <span className={"text-center inline-block my-3.5 sm:my-2 mx-2"}>
            <a href={url} target={!url.startsWith("#") ? "_blank" : "_self"}
                className="text-xl no-underline font-normal text-[#009cff] bg-[#f9f9f9] hover:bg-[#f4f4f4] hover:transition-all px-4 py-3 rounded-xl">
                <span className="align-middle inline-flex justify-center mr-0.25">{icon}&nbsp;</span>
                <span>{children}</span>
            </a>
        </span>
    )
}

const Article: React.FC<ArticleProps> = ({ children }) => {
    return (
        <div
            className="mx-auto w-full max-w-[90%] format format-md
                       md:format-base
                       lg:max-w-5xl lg:format-lg
                       format-blue dark:format-invert">
            {children}
        </div>
    )
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="pt-6 lg:pt-12 bg-white dark:bg-gray-900">
            {children}
        </main>
    )
}


const FewShotResult: React.FC<FewShotResultProps> = ({ children, id, demos, demos_label, video, hidden }) => {
    // Result for Few-Shot Manipulation with Demos on left, and video on right
    return (
        // add hidden if hide is true
        <div id={id}
            className={"grasp-result flex flex-row flex-wrap justify-items-center items-center mt-6" + (hidden ? " hidden" : "")}>
            <div className="sm:basis-1/3 align-middle items-center sm:pr-5 md:pr-10 pb-4 sm:pb-0">
                <p className="text-center font-medium text-2xl !mt-0 !mb-2">{children}</p>
                <img src={demos} alt={typeof children === 'string' ? children : 'Demo'} className="mx-auto !my-4 max-w-[80%] sm:max-w-[100%]" />
                <p className="text-center !mt-2 !mb-0">{demos_label}</p>
            </div>
            <div className="sm:basis-2/3">
                <video controls muted playsInline
                    className="rounded-lg w-full max-w-[720px]">
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}


export const Head: HeadFC = () => <title>ArXiv 2025: SpaRC</title>

const carouselResponsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};


const CarouselItem: React.FC<CarouselItemProps> = ({ children, video }) => {
    return (
        <div>
            <video autoPlay muted playsInline loop title={video}
                className="carousel-video px-1.5 rounded-xl">
                <source src={video} type="video/mp4" />
            </video>
            {/*<p className="text-center">{children}</p>*/}
        </div>
    )
}

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <Main>
                <Article>
                    <Title>
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-600">SpaRC</span>
                        <span className="font-extrabold">: </span>
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Spa</span>
                        <span className="font-extrabold">rse </span>
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">R</span>
                        <span className="font-extrabold">adar-</span>
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600">C</span>
                        <span className="font-extrabold">amera Fusion<br /> for 3D Object Detection</span>
                    </Title>

                    <Venue website={"https://https://arxiv.org/abs/2411.19860"}>
                        <span className="font-normal text-stone-600 hover:text-transparent hover:bg-clip-text
                        hover:bg-gradient-to-r  hover:from-pink-500 hover:to-indigo-600
                        hover:transition-all">Under Review</span>
                    </Venue>

                    {/* Authors */}
                    <div className="flex flex-wrap justify-center text-xl lg:text-xl mb-4">
                        <Author website={"https://scholar.google.com/citations?user=jt16iokAAAAJ&hl=en/"}>Philipp Wolters</Author>
                        <Author website={"https://scholar.google.com/citations?hl=en&user=8pdVZM0AAAAJ"}>Johannes Gilg</Author>
                        <Author website={"https://scholar.google.com/citations?hl=en&user=TWJuTroAAAAJ"}>Torben Teepe</Author>
                        <Author website={"https://scholar.google.de/citations?user=wxWHG3IAAAAJ&hl=en"}>Felix Fent</Author>
                        <Author website={"https://scholar.google.com/citations?hl=en&user=OCVPHl0AAAAJ"} lastAuthor={true}>Gerhard Rigoll</Author>
                    </div>

                    {/* Affilations */}
                    <div className="flex flex-wrap justify-center text-xl lg:text-xl mb-1">
                        <Affiliation website={"https://www.tum.de/"}>Technical University of Munich</Affiliation>
                    </div>

                    {/* Action Links */}
                    <p className="flex flex-wrap justify-center">
                        <ActionLink url={"https://arxiv.org/abs/2411.19860"} icon={<FaFilePdf />}>Paper</ActionLink>
                        {/* <ActionLink url={"#video"} icon={<FaVideo />}>Video</ActionLink> */}
                        <ActionLink url={"https://github.com/phi-wol/sparc"} icon={<AiFillGithub />}>Code (Coming Soon)</ActionLink>
                    </p>

                    {/* <p className="flex flex-wrap justify-center">
                        <ActionLink url={"https://arxiv.org/abs/2411.19860"} icon={<FaFilePdf />}>Follow-up Project</ActionLink>
                    </p> */}

                    {/* Teaser Figure */}

                    <img
                        src={teaser_figure}
                        alt="Inference Trade-off of SpaRC"
                        className="border-2 border-slate-100 rounded-xl mx-auto max-w-[75%] sm:max-w-[70%]"
                    />

                    <div className="flex justify-center">
                        <p className="text-center text-xl !mt-0 !mb-2 font-medium max-w-[100%] md:max-w-[75%]">
                            SpaRC achieves superior accuracy and efficiency by operating directly on point features, avoiding computationally expensive BEV-grid rendering while maintaining high detection performance.
                            <br />
                            <br />
                        </p>
                    </div>
                </Article>

                <div className="w-full my-6 pt-6 pb-4 bg-gradient-to-r from-pink-100/70 via-indigo-100/70 to-emerald-100/70">
                    <Article>
                        <Abstract>
                            In this work, we present SpaRC, a novel Sparse fusion transformer for 3D perception that integrates multi-view image semantics with Radar and Camera point features.
                            The fusion of radar and camera modalities has emerged as an efficient perception paradigm for autonomous driving systems.
                            While conventional approaches utilize dense Bird's Eye View (BEV)-based architectures for depth estimation, contemporary query-based transformers excel in camera-only detection through object-centric methodology.
                            However, these query-based approaches exhibit limitations in false positive detections and localization precision due to implicit depth modeling.
                            We address these challenges through three key contributions: (1) sparse frustum fusion (SFF) for cross-modal feature alignment, (2) range-adaptive radar aggregation (RAR) for precise object localization, and (3) local self-attention (LSA) for focused query aggregation.
                            In contrast to existing methods requiring computationally intensive BEV-grid rendering, SpaRC operates directly on encoded point features, yielding substantial improvements in efficiency and accuracy.
                            Empirical evaluations on the nuScenes and TruckScenes benchmarks demonstrate that SpaRC significantly outperforms existing dense BEV-based and sparse query-based detectors.
                            Our method achieves state-of-the-art performance metrics of 67.1 NDS and 63.1 AMOTA.
                        </Abstract>
                    </Article>
                </div>

                <Article>
                    {/* YouTube Video */}
                    {/* <h2 className="font-semibold border-b-[1px]" id="video">Video with Audio</h2>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/g4Y4LQ0nDrA"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen className="rounded-lg"></iframe>
                    </div> */}

                    {/* Architecture Overview */}

                    <h2 className="font-semibold border-b-[1px] !mb-4">Architecture Overview</h2>
                    <img src={architecture_figure} alt="SpaRC Architecture" className="w-full rounded-lg" />
                    {/* <p className="mt-4">
                        Our SpaRC architecture leverages sparse frustum fusion (SFF) to align cross-modal features, range-adaptive radar aggregation (RAR) for precise localization, and local self-attention (LSA) for focused query processing. This enables efficient operation directly on point features without requiring dense BEV-grid rendering.
                    </p> */}

                    {/* Results */}
                    <h2 className="font-semibold border-b-[1px] !mb-4">Exploring the Potential of SpaRC in Long-Range Perception</h2>
                </Article>

                <div className="w-full my-6 pt-6 pb-4 bg-gradient-to-r from-pink-100/70 via-indigo-100/70 to-emerald-100/70">
                    <Article>
                        <div className="mx-auto w-full py-2 md:py-4">
                            <div className="relative pb-8 mb-3">
                                <Carousel
                                    responsive={{
                                        desktop: {
                                            breakpoint: { max: 3000, min: 1024 },
                                            items: 1,
                                        },
                                        tablet: {
                                            breakpoint: { max: 1024, min: 464 },
                                            items: 1,
                                        },
                                        mobile: {
                                            breakpoint: { max: 464, min: 0 },
                                            items: 1,
                                        }
                                    }}
                                    infinite={true}
                                    showDots={true}
                                    renderDotsOutside={true}
                                    autoPlay={true}
                                    autoPlaySpeed={5000}
                                >
                                    <div className="px-4 md:px-8">
                                        <img src={comp_1} alt="Qualitative Comparison 1" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Night Scenario</p>
                                    </div>
                                    <div className="px-4 md:px-8">
                                        <img src={comp_5} alt="Qualitative Comparison 2" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Overcast and Long Distance</p>
                                    </div>
                                    <div className="px-4 md:px-8">
                                        <img src={comp_4} alt="Qualitative Comparison 3" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Foggy Scene</p>
                                    </div>
                                    <div className="px-4 md:px-8">
                                        <img src={comp_2} alt="Qualitative Comparison 4" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Dark Tunnel</p>
                                    </div>
                                    <div className="px-4 md:px-8">
                                        <img src={comp_3} alt="Qualitative Comparison 5" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Roundabout Traffic</p>
                                    </div>
                                    <div className="px-4 md:px-8">
                                        <img src={comp_6} alt="Qualitative Comparison 6" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Sunset Drive</p>
                                    </div>
                                    <div className="px-4 md:px-8">
                                        <img src={comp_7} alt="Qualitative Comparison 7" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Winter Scenario</p>
                                    </div>
                                    <div className="px-4 md:px-8">
                                        <img src={comp_8} alt="Qualitative Comparison 8" className="rounded-xl w-full shadow-lg" />
                                        <p className="text-center mt-4 text-sm text-gray-700">Glaring Sunlight</p>
                                    </div>
                                </Carousel>
                            </div>
                            <p className="text-center text-lg md:text-xl md:max-w-[85%] mx-auto">
                                Qualitative comparison of SpaRC's detection performance on the <a href="https://www.man.eu/truckscenes/" className="text-blue-600 hover:text-blue-800 underline">NeurIPS TruckScenes</a> benchmark across various challenging scenarios,
                                showcasing robust performance in diverse environmental conditions with up to 150m detection range.
                            </p>
                        </div>
                    </Article>
                </div>

                <Article>

                    <h2 id="citation" className="border-b-[1px]">Citation</h2>
                    <div className="relative overflow-auto group">
                        <pre className="bg-gradient-to-r from-pink-100 via-indigo-100 to-emerald-100 !my-0 p-6 rounded-lg">
                            <code id="citation-bib" className="font-medium text-slate-800 block">{
                                `@article{wolters2024sparc,
  title={SpaRC: Sparse Radar-Camera Fusion for 3D Object Detection},
  author={Wolters, Philipp and Gilg, Johannes and Teepe, Torben and Herzog, Fabian and Fent, Felix and Rigoll, Gerhard},
  journal={arXiv preprint arXiv:2411.19860},
  year={2024}
}`}
                            </code>
                        </pre>
                        <button
                            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2
                                     text-sm font-medium bg-white/90 
                                     hover:bg-white transition-all duration-200
                                     border border-indigo-200 rounded-lg shadow-sm
                                     opacity-0 group-hover:opacity-100 focus:opacity-100"
                            onClick={() => {
                                const bib = document.getElementById("citation-bib");
                                if (bib) {
                                    navigator.clipboard.writeText(bib.textContent || "")
                                        .then(() => {
                                            const button = document.getElementById("copy-feedback");
                                            const icon = document.getElementById("copy-icon");
                                            if (button && icon) {
                                                // Update text and icon
                                                button.textContent = "Copied!";
                                                icon.innerHTML = `<svg class="stroke-emerald-400" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5"/></svg>`;

                                                // Reset after 2 seconds
                                                setTimeout(() => {
                                                    button.textContent = "Copy";
                                                    icon.innerHTML = `<svg class="stroke-emerald-400" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;
                                                }, 2000);
                                            }
                                        })
                                        .catch(err => console.error('Failed to copy text: ', err));
                                }
                            }}>
                            <span id="copy-feedback" className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-600 text-transparent bg-clip-text">Copy</span>
                            <span id="copy-icon" className="text-base">
                                <svg className="stroke-emerald-400" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                </svg>
                            </span>
                        </button>
                    </div>
                </Article>

                <footer className={"flex flex-col justify-center bg-gray-50 mt-8 py-8"}>
                    {/*click to go back to top*/}
                    <div className="flex justify-center align-middle text-lg">
                        <a role="button" className="text-blue-500" onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                            <span
                                className="align-text-top inline-flex justify-center mr-0.25"><FaArrowUp />&nbsp;</span>
                            <span>Back to Top</span>
                        </a>
                    </div>
                    <div className="mt-2.5 text-center">
                        Website borrowed from&nbsp;
                        <a href="https://github.com/f3rm/f3rm.github.io" target="_blank" className="text-blue-500">
                            <span
                                className="align-text-top inline-flex justify-center mr-0.25"><AiFillGithub />&nbsp;</span>
                            <span>GitHub</span>
                        </a>
                    </div>
                </footer>
            </Main >
        </>
    )
}

export default IndexPage
