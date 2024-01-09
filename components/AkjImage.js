import useProgressiveImg from '../components/useProgressiveImg';

export default function AkjImage ({ item }) {
   const [src, { blur }] = useProgressiveImg(item.replace(/img\/main/, 'img/blur'), item);
   return (
      <img
         src={`${src}?w=162&auto=format`}
         srcSet={`${src.replace(/main/, 'small')} 333w, ${src.replace(/main/, 'medium')} 666w, ${src} 1000w`}
         alt={item}
         loading="lazy"
         style={{
            display    : 'block',
            width      : '100%',
            filter     : blur ? "blur(20px)" : "none",
            transition : blur ? "none" : "filter 0.2s ease-out"
         }}
      />
   );
}
