// wazan scieżka /pages/_document.js nie od razu zrobiony ale next
//application shell, pozwala na kasmizacje całego dokumentu html wszystkie leemnty które tworzą aplikację
// do konfiguracji ogólnej dokumentu; trzeba restarotwac serwer po zmianach
import Document, { Html, Head, Main, NextScript } from "next/document";
//Head to nie ten sam komponent co z Head import from 'next/head'

//nazwa dowolna ale musi być klasowy, zeby rozszerzyć Document od nexta
class MyDocument extends Document {
  render() {
    //wymagana metoda
    return (
      //musi zwrócić JSX code z bardzo specyficzną strukturą
      <Html lang="en">
        <Head />
        <body>
          {/* standardowe body */}
         {/* poniższy div jest przydanty jak chcemy dodać konent spoza aplikacji np React portals */}
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
