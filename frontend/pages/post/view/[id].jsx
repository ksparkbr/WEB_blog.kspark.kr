import axios from "axios";
import PostAccessDenied from "../../../src/component/post/PostAccessDenied";
import PostView from "../../../src/component/post/PostView";

export async function getServerSideProps(context){
    const {id} = context.params;
    const {session} = context.query;
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;

    let data = await axios.post(API_URL + "/post/view/" + id, {session : session}, {withCredentials : true})
                          .then(res => res.data);
    if(data != "Access Denied"){
        const manufacturePostContent = (content) => {
            if(content != null){
                try{
                [...content.match(/#[^\s\<#\?]+/gi)].sort((a,b)=>b.length - a.length).forEach(item=>{
                    content = content.replaceAll(item, `<a class="hashtag" href="/post/list/${item.replace("#",'')}">${item}</a>`)
                })
                }
                catch(e){}
            }
            return content;
        }
        data.CONTENT = manufacturePostContent(data.CONTENT);
    }
    return {
        props : {
            post : data
        }
    }
}

export default function _PostView({post}){
    return <>
    {post != "Access Denied" ? (<>
        <PostView post={post} />
    
    </>) : (<>
        <PostAccessDenied />
    </>)}
        
    </>
}