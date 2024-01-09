export default function calcColumnsH1 (theWindow) {
   let thisNumColumns = 4;
   let thisH1FontSize = 65;
   if (theWindow.innerWidth < 576) {
      thisNumColumns = 1;
      thisH1FontSize = 25;
   } else if (theWindow.innerWidth < 767.98) {
      thisNumColumns = 2;
      thisH1FontSize = 35;
   } else if (theWindow.innerWidth < 991.98) {
      thisNumColumns = 3;
      thisH1FontSize = 45;
   } else if (theWindow.innerWidth < 1199.98) {
      thisNumColumns = 4;
      thisH1FontSize = 55;
   }
   return {thisNumColumns, thisH1FontSize};
}
