import HeroSvg from '../assets/hero.svg';

export function Hero() {
    return(
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-1/2 lg:h-screen">
            <img src={HeroSvg} alt="Hero imagem" />
        </div>
    );
}