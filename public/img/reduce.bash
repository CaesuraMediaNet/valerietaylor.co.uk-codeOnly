# % for i in `ls *jpg`; do echo $i; ./reduce.bash $i;done
# Best monitor : 3840 x 2160
# Biggest pic only needs to be 3840 / 3 px == $2px tops
# Reduce only the big ones.
#
if [ $# -lt 4 ];
   then
      echo "Error. Usage : ./reduce.bash <image.jpg> <Width> <kb file size> <dest directory>"
      exit 1
else 

# $1 == image.jpg
# $2 == 1000x1000
# $3 == 125Kb
# $4 == main

echo "Reducing $1 $3x$3px and $3kb in $4/ ..."
mkdir -p $4
echo "Convert $1 to $1.$2x$2.jpg"
convert -resize $2x$2 $1 $1.$2x$2.jpg
echo "Creating $4/$1.$2x$2.jpg"
jpegoptim -S $3 -s -d $4 $1.$2x$2.jpg
if [ -f $4/$1.$2x$2.jpg ];
   then
      echo "mv $4/$1.$2x$2.jpg $4/$1"
      mv $4/$1.$2x$2.jpg $4/$1 
      echo "rm  $1.$2x$2.jpg"
      rm  $1.$2x$2.jpg
else 
   echo "jpegoptim skipped, moving converted image"
   mv $1.$2x$2.jpg $4/$1
fi
echo "See $4/$1";

fi
