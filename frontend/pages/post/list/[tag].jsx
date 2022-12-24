import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import LoadingSpinner from "../../../src/component/common/LoadingSpinner";
import PostCard from "../../../src/component/post/Post-card";
import PostList from "../../../src/component/post/PostList";

export default function _PostList() {
    const router = useRouter();
    const {tag} = router.query;
    return <>
        <Head>
            <title>홈 | BLOG.KSPARK.KR</title>
        </Head>
        <PostList tag = {tag}/>
    </>
}