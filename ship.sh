echo  '               /|___
             ///|   ))
           /////|   )))
         ///////|    )))
       /////////|     )))
     ///////////|     ))))
   /////////////|     )))
  //////////////|    )))
////////////////|___)))
  ______________|________
  \                    /
~~~~~~~~~~~~~~~~~~~~~~~~~~~'

echo '### build npm ###'
( cd app ; npm run build --prod )

echo '### firebase deploy ###'
firebase deploy --only hosting

say 'successfully shipped'