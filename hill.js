const main = () =>
{
    // Getting the values from encryption form
    let str1 =  document.getElementById('msg').value;
    let str2 =  document.getElementById('key').value;
    let result = document.getElementById('result');

    // Validating if user enters correct information
    if (str1.length > 3) {
        alert("Message should be only 3 letters");
        window.location.reload();
        return false;
    }
    else if (str2.length < 9 || str2.length > 9)
    {
        alert("Key should only be 9 letters");
        window.location.reload();
        return false;
    }

    var mess = str1.toUpperCase();
    var ky = str2.toUpperCase();

    // Creating an empty 3*3 matrix array
    let matrix =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 2; j++)
        {
            temp.push(i+j)
        }
        matrix.push(temp)
    }
    
    // Calling method to change key alphabets to 3*3 matrix
    createKeyMatrix(ky, matrix); 

    // Creating an empty vector matrix array for message
    let message =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        message.push(temp)
    }
  
    // changing the matrix to numbers and storing in message array
    for (let i = 0; i < 3; i++) 
        message[i][0] = (mess.charCodeAt(i)) % 65; 


    // finding determinant of given key to check if its valid to proceed
    var determinantM = 0;
    for(i = 0; i < 3; i++)
    {
        determinantM = determinantM + (matrix[0][i] * (matrix[1][(i+1)%3] * matrix[2][(i+2)%3] - matrix[1][(i+2)%3] * matrix[2][(i+1)%3]));
    }
    // console.log(determinantM)

    if(determinantM % 2 == 0 || determinantM % 13 == 0 || determinantM == 0 ) 
    {
        // || Math.sign(determinantM) == -1
        alert("Key is not valid for decryptin. Kindly! use another key.")
        window.location.reload();
    }


    let corrupt =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        corrupt.push(temp)
    }

    // passing the keymatrix , message to encryption method
    encryption(corrupt, matrix, message); 

    let finalTemp = []
    // console.log(finalTemp)
    for (let i = 0; i < 3; i++) 
        finalTemp[i] = (corrupt[i][0] + 65)
        // console.log(finalTemp)
        let final =""
            for(let i=0; i<finalTemp.length; i++)
            {
                final = final + String.fromCharCode(finalTemp[i])
            }
            result.innerHTML = final.toLocaleLowerCase();
}

// Method to change key into vector matrix
const createKeyMatrix = (key , matrix) =>
{
    // console.log(key)
    let k = 0; 
    for (let i = 0; i < 3; i++)  
    { 
        for (let j = 0; j < 3; j++)  
        {     
            matrix[i][j] = (key.charCodeAt(k)) % 65; 
            k++; 
        } 
    } 
}

// Method to do encryption of given message
const encryption = (finalMatrix,  matrix,   message) =>
{ 
    let x, i, j; 
    for (i = 0; i < 3; i++)  
    { 
        for (j = 0; j < 1; j++) 
        { 
            finalMatrix[i][j] = 0; 
          
            for (x = 0; x < 3; x++) 
            { 
                finalMatrix[i][j] +=  
                matrix[i][x] * message[x][j]; 
            } 
          
            finalMatrix[i][j] = finalMatrix[i][j] % 26; 
        } 
    } 
}


// Method to do decryption of given cipherText
const decryption = () =>
{
    let str1 =  document.getElementById('dmsg').value;
    let str2 =  document.getElementById('dkey').value;
    let result = document.getElementById('resultD');

    var mess = str1.toUpperCase();
    var ky = str2.toUpperCase();


    // console.log(mess)
    // console.log(ky)

    let matrix =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 2; j++)
        {
            temp.push(i+j)
        }
        matrix.push(temp)
    }

    createKeyMatrix(ky, matrix); 
    let message =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        message.push(temp)
    }
  
    for (let i = 0; i < 3; i++) 
        message[i][0] = (mess.charCodeAt(i)) % 65; 

    let corrupt =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        corrupt.push(temp)
    }

    let decrypt =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        decrypt.push(temp)
    }
    let b =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        b.push(temp)
    }

    // passing the matrix to inverse method
    let KeyInverse = findInverse(matrix);
    // console.log(KeyInverse)

    let dmessage =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        dmessage.push(temp)
    }
    for (let i = 0; i < 3; i++) 
        dmessage[i][0] = (mess.charCodeAt(i)) % 65; 

    let final =[]
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        final.push(temp)
    }

    encryption(final,KeyInverse,dmessage)
    
    
    let finalTemp2 = []
    for (let i = 0; i < 3; i++) 
    finalTemp2[i] = (final[i][0] +65)
        let finalt =""
            for(let i=0; i<finalTemp2.length; i++)
            {
                finalt = finalt + String.fromCharCode(finalTemp2[i])
            }
            resultD.innerHTML = finalt.toLocaleLowerCase();

}  

const findInverse = (matrix) =>
{
    var determinant = 0;
    let mat = matrix
   
    let i, j;

    // Method to find determinant of matrix
    for(i = 0; i < 3; i++)
    {
        determinant = determinant + (mat[0][i] * (mat[1][(i+1)%3] * mat[2][(i+2)%3] - mat[1][(i+2)%3] * mat[2][(i+1)%3]));
    }

    //checking if determinant is negative
    if(Math.sign(determinant) == -1 )
    {
        determinant = mod(determinant,26)
        console.log(determinant)
    }

    let finalDeterminant =  modInverse(determinant,26)

    // inversing the matrix
    let detTemp =[]
	for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            detTemp.push(((mat[(j+1)%3][(i+1)%3] * mat[(j+2)%3][(i+2)%3]) - (mat[(j+1)%3][(i+2)%3] * mat[(j+2)%3][(i+1)%3])) )
        }
    }

    let last = []
    for (let i = 0; i < 3; i++)
    {
        let temp =[]
        for(let j = 0; j < 1; j++)
        {
            temp.push(i+j)
        }
        last.push(temp)
    }

    // Muliplying and taking module 26
    let k = 0; 
    for (let i = 0; i < 3; i++)  
    { 
        for (let j = 0; j < 3; j++)  
        {     
            let v = detTemp[k] 
            if(Math.sign(v) == -1)
            {
                v = (v % 26)
            }
            last[i][j] = mod((v * finalDeterminant),26); 
            k++; 
        } 
    } 
    return last;

}
// function to find mod of given numbers
function mod(n, m) {
    return ((n % m) + m) % m;
}

// function to find ModInvserse
function modInverse(a, prime) 
{ 
    a = a % prime; 
    for (let x=1; x<prime; x++) 
    {
       if ((a*x) % prime == 1) 
          return x; 
    }
    return -1; 
} 

// Function for css in html page
function openCity(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-red";
  }