package com.example.polls.payload.Response;

import com.example.polls.model.Group;



public class GroupSummaryResponse {
    private Long id;
    private String name;
    private String imageUrl;
    private String joinCode;
    private int memberCount;

    public GroupSummaryResponse(Group group) {
        this.id = group.getId();
        this.name = group.getName();
        this.joinCode = group.getJoinCode();
        this.imageUrl = group.getImageUrl();
        this.memberCount = group.getMembers().size();

    }

    public int getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(int memberCount) {
        this.memberCount = memberCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getJoinCode() {
        return joinCode;
    }

    public void setJoinCode(String joinCode) {
        this.joinCode = joinCode;
    }
}
