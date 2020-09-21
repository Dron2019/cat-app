/* beautify preserve:start */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';




export default  function() {
    let buttonStyle = {
        backgroundColor: '#4CAF50', /* Green */
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        transition:'.7s',
    }
    let imgStyle = {
        maxHeight:'calc(100vh - 100px)',
        objectFit:'contain',
        width: '100%'
    }
    const [animalContainer, setAnimalContainer] = useState('g');
    const [disabledButton, setDisabledButton] = useState(false);
    
    function setFetched(adress,some, corsHeader){
        setDisabledButton(true);
    let request = fetch(adress,{
            mode: corsHeader ? 'no-cors': 'cors',
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        })
        .catch(err=>{
            alert(err);
            setDisabledButton(false);
            setAnimalContainer(function(){
                    return <div>Something went wrong</div>
            });
        })
        .then(el=>{
            if(el.status ===404) {
                console.log(el);
                setAnimalContainer(function(){
                    return (
                        <div>
                            <img src={'https://http.cat/'+el.status+'/'}/>
                            <div>{el.status + el.statusText}</div>
                        </div>
                    )
                });
                setDisabledButton(false);
                throw Error('ss');
            }
            setDisabledButton(false);
            return el.json();
        })
        .then(el=>{
            setAnimalContainer(function(){
                if (el.file !== undefined)
                {
                        setDisabledButton(false);
                    return <img style={imgStyle} src={el.file}/>
                }
                if (el.url !== undefined)
                {
                    setDisabledButton(false);
                    return <img onError={(e)=>{setAnimalContainer(()=><div style={{fontSize:'50px',fontWeight:'bold'}}>Ошибка вывода</div>)}} style={ imgStyle} src={el.url}/>
                }
                return <div>Nothing to find</div>
            });
        })
    }
    function testXMLHttpRequest(adress,headers = []) {
            let request = new XMLHttpRequest();
            request.open('GET', adress, true);
            request.withCredentials = true;
            request.mode = true;
            headers.forEach(head=>{
                console.log(head,'!');
                for (var key in head){
                    console.log(head[key]);
                    request[key] = head[key];
                    request.setRequestHeader(key,head[key]);
                }
            })
            request.mode = 'cors';
            // request.setRequestHeader('Access-Control-Allow-Origin','*');
            request.send();

            request.onload = function(){
                let el = JSON.parse(request.response);
                alert(el);
                setAnimalContainer(function(){
                    if (el.file !== undefined)
                    {
                        setDisabledButton(false);
                        return <img style={imgStyle} src={el.file}/>
                    }
                    if (el.url !== undefined)
                    {
                        setDisabledButton(false);
                        return <img onError={(e)=>{setAnimalContainer(()=><div style={{fontSize:'50px',fontWeight:'bold'}}>Ошибка вывода</div>)}} style={ imgStyle} src={el.url}/>
                    }
                    return <div>Nothing to find</div>
                });
            };
            request.onerror = function(err) {
                alert(err);
            }
            console.log(request);
    }
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <button onMouseDown={(e)=>e.target.style.backgroundColor = 'red'} onMouseUp={(e)=>e.target.style.backgroundColor = 'rgb(76, 175, 80)'} style={buttonStyle} disabled={disabledButton} onClick={()=>{setFetched('//aws.random.cat/meow')}}>Cats</button>
                <br/>
                <button style={buttonStyle} disabled={disabledButton} onClick={()=>{setFetched('//random.dog/woof.json',[{mode:'cors'}],true)}}>Dogs</button>
                <br/>
                <button style={buttonStyle} disabled={disabledButton} onClick={()=>{testXMLHttpRequest('//random.dog/woof.json',[{mode:'no-cors'},{redirect: "follow"}],false)}}>DogsXml</button>
            </div>
            {/* <span onClick={()=>{setFetched('//randomfox.ca/floof/')}}>Foxes</span> */}
            {animalContainer}
        </div>

        );
    };
/* beautify preserve:end */