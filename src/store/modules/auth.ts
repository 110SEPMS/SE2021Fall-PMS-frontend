import router from '@/router';
import { authenticateGithubToken, authenticateAdmin } from '../../apis/authorize'
import { Mutation, State, Action, Getter } from 'vuex-simple';

export default class AuthModule {
    @State()
    private token: string | null = null;
    @State()
    private authority: string | null = null;
    @State()
    private userAccount: string | null = null;
    @State()
    private trelloKey = "";
    @State()
    private trelloToken = "";

    @Mutation()
    private setToken(token: string | null) {
        this.token = token
    }
    @Mutation()
    private setAuthority(authority: string | null) {
        this.authority = authority
    }
    @Mutation()
    private setUserAccount(account: string | null) {
        this.userAccount = account
    }
    @Mutation()
    private setTrelloKey(key: string) {
        this.trelloKey = key
    }
    @Mutation()
    private setTrelloToken(token: string) {
        this.trelloToken = token
    }

    @Getter()
    public get isAuthenticated() {
        return !!this.token;
    }
    @Getter()
    public get getToken() {
        return this.token;
    }
    @Getter()
    public get getAuthority() {
        return this.authority;
    }
    @Getter()
    public get getUserAccount() {
        return this.userAccount;
    }
    @Getter()
    public get getTrelloKey() {
        return this.trelloKey;
    }
    @Getter()
    public get getTrelloToken() {
        return this.trelloToken;
    }

    @Action()
    public updateTrelloKey(key : string) {
        this.setTrelloKey(key);
    }
    @Action()
    public updateTrelloToken(token : string) {
        this.setTrelloToken(token);
    }

    @Action()
    public async login(githubCode: string) {
        authenticateGithubToken(githubCode).then((res) => {
            this.handleLoginResponse(res);
            router.push("/project");
        }).catch((err) => {
            router.push("notfound");
        });
    }
    @Action()
    public async loginByAdmin(data: { account: string, password: string }) {
        await authenticateAdmin(data.account, data.password)
            .then((res) => {
                this.handleLoginResponse(res);
                router.push("/admin/manage");
            })
            .catch((err) => {
                if (err.response.status == 400) {
                    alert(err.response.data.detail);
                } else {
                    router.push("notfound");
                }
            });
    }
    @Action()
    public logout() {
        this.setToken(null);
        this.setAuthority(null);
        this.setUserAccount(null);
        router.push('/');
    }

    private handleLoginResponse = (res: any): void => {
        this.setToken(res.data.token);
        this.setAuthority(res.data.authority);
        this.setUserAccount(res.data.userAccount);
    }
}