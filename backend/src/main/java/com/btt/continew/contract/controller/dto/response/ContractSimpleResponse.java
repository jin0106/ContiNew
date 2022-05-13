package com.btt.continew.contract.controller.dto.response;

import com.btt.continew.contract.domain.Contract;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ContractSimpleResponse {

    @JsonProperty("location")
    @ApiModelProperty(position = 0, notes = "소재지", example = "서울특별시 강남구 압구정동 369-1")
    private String location;

    @JsonProperty("contract_type")
    @ApiModelProperty(position = 1, notes = "전월세 타입", example = "월세")
    private String contractType;

    @JsonProperty("contract_start")
    @ApiModelProperty(position = 2, notes = "계약 시작일", example = "2022-02-02")
    @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate contractStart;

    @JsonProperty("contract_end")
    @ApiModelProperty(position = 3, notes = "계약 만료일", example = "2022-06-02")
    @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate contractEnd;

    @JsonProperty("contractor_username")
    @ApiModelProperty(position = 4, notes = "계약자 유저네임", example = "흠냐링")
    private String contractorUsername;

    @JsonProperty("current_level")
    @ApiModelProperty(position = 5, notes = "현재 단계", example = "1")
    private Integer currentLevel;

    public ContractSimpleResponse() {
    }

    public ContractSimpleResponse(String location, String contractType, LocalDate contractStart, LocalDate contractEnd,
        String contractorUsername, Integer currentLevel) {
        this.location = location;
        this.contractType = contractType;
        this.contractStart = contractStart;
        this.contractEnd = contractEnd;
        this.contractorUsername = contractorUsername;
        this.currentLevel = currentLevel;
    }

    public static ContractSimpleResponse fromSeller(Contract contract) {
        return new ContractSimpleResponse(
            contract.getLocation(),
            contract.getContractType(),
            contract.getContractStart(),
            contract.getContractEnd(),
            contract.getBuyer().getUsername(),
            contract.getLevel()
        );
    }

    public static ContractSimpleResponse fromBuyer(Contract contract) {
        return new ContractSimpleResponse(
            contract.getLocation(),
            contract.getContractType(),
            contract.getContractStart(),
            contract.getContractEnd(),
            contract.getBuyer().getUsername(),
            contract.getLevel()
            );
    }
}