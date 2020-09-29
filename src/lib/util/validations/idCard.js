export const isValidIdCard = (idCard) => {
    //Preguntamos si la idCard consta de 10 digitos
    if(idCard.length == 10){

       //Obtenemos el digito de la region que sonlos dos primeros digitos
       var regionDigit = idCard.substring(0,2);

       //Pregunto si la region existe ecuador se divide en 24 regiones
       if( regionDigit >= 1 && regionDigit <=24 ){

         // Extraigo el ultimo digito
         var lastDigit   = idCard.substring(9,10);

         //Agrupo todos los pares y los sumo
         var pairs = parseInt(idCard.substring(1,2)) + parseInt(idCard.substring(3,4)) + parseInt(idCard.substring(5,6)) + parseInt(idCard.substring(7,8));

         //Agrupo los odd, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
         var n1 = idCard.substring(0,1);
         var n1 = (n1 * 2);
         if( n1 > 9 ){ var n1 = (n1 - 9); }

         var n3 = idCard.substring(2,3);
         var n3 = (n3 * 2);
         if( n3 > 9 ){ var n3 = (n3 - 9); }

         var n5 = idCard.substring(4,5);
         var n5 = (n5 * 2);
         if( n5 > 9 ){ var n5 = (n5 - 9); }

         var n7 = idCard.substring(6,7);
         var n7 = (n7 * 2);
         if( n7 > 9 ){ var n7 = (n7 - 9); }

         var n9 = idCard.substring(8,9);
         var n9 = (n9 * 2);
         if( n9 > 9 ){ var n9 = (n9 - 9); }

         var odd = n1 + n3 + n5 + n7 + n9;

         //Suma total
         var sum = (pairs + odd);

         //extraemos el primero digito
         var sumFirstDigit = String(sum).substring(0,1);

         //Obtenemos la ten inmediata
         var ten = (parseInt(sumFirstDigit) + 1)  * 10;

         //Obtenemos la resta de la ten inmediata - la sum esto nos da el digito validador
         var validatorDigit = ten - sum;

         //Si el digito validador es = a 10 toma el valor de 0
         if(validatorDigit == 10)
           var validatorDigit = 0;

         //Validamos que el digito validador sea igual al de la idCard
         if(validatorDigit == lastDigit){
           return true;
         }else{
           return false;
         }

       }else{
         // imprimimos en consola si la region no pertenece
         return false;
       }
    }else{
       //imprimimos en consola si la idCard tiene mas o menos de 10 digitos
       return false;
    }
 }