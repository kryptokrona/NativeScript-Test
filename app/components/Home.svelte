<script lang="ts">
    import {Http, HttpResponse} from '@nativescript/core'


    let data
    const getHuginData = async () => {
        Http.request({
            url: 'https://api.hugin.chat/api/v1/posts?size=50',
            method: 'GET'
        }).then(
            (response: HttpResponse) => {
                data = JSON.parse(response.content)
            },
            e => {
                console.log('erroe ', e)
            }
        )
    }

    getHuginData()

</script>

<page>
    <actionBar title="Home"/>
    <scrollView orientation="vertical">
        <stackLayout>

            {#if data}
                {#each data.posts ?? [] as item}
                    <label class="label" textWrap="true" text={item.message}/>
                {/each}
            {:else }
                <label class="label" textWrap="true" text='NO MESSAGES'/>
            {/if}

        </stackLayout>
    </scrollView>
</page>

<style>

    .label {
        margin: 10px 0;
        background-color: #171717;
        border-radius: 8px;
        border: 1px solid #252525;
        padding: 20px;
    }

</style>
