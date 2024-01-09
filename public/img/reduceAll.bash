for i in `ls *jpg *png`; do
   ./reduce.bash $i 100  1   blur;
   ./reduce.bash $i 333  5   small;
   ./reduce.bash $i 666  10  medium;
   ./reduce.bash $i 1000 100 main;
   echo "$i done";
done
