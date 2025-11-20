"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditIntentDto = exports.GenerateWebsiteDto = exports.ColorSchemeDto = exports.AIModelProvider = exports.CodeType = void 0;
const class_validator_1 = require("class-validator");
var CodeType;
(function (CodeType) {
    CodeType["HTML"] = "HTML";
    CodeType["REACT"] = "REACT";
})(CodeType || (exports.CodeType = CodeType = {}));
var AIModelProvider;
(function (AIModelProvider) {
    AIModelProvider["GEMINI"] = "GEMINI";
    AIModelProvider["QWEN"] = "QWEN";
})(AIModelProvider || (exports.AIModelProvider = AIModelProvider = {}));
class ColorSchemeDto {
    name;
    primary;
    secondary;
    accent;
}
exports.ColorSchemeDto = ColorSchemeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ColorSchemeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ColorSchemeDto.prototype, "primary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ColorSchemeDto.prototype, "secondary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ColorSchemeDto.prototype, "accent", void 0);
class GenerateWebsiteDto {
    companyName;
    industry;
    websiteType;
    designStyle;
    colorScheme;
    codeType;
    aiModel;
}
exports.GenerateWebsiteDto = GenerateWebsiteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateWebsiteDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateWebsiteDto.prototype, "industry", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateWebsiteDto.prototype, "websiteType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateWebsiteDto.prototype, "designStyle", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", ColorSchemeDto)
], GenerateWebsiteDto.prototype, "colorScheme", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CodeType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GenerateWebsiteDto.prototype, "codeType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(AIModelProvider),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GenerateWebsiteDto.prototype, "aiModel", void 0);
class EditIntentDto {
    projectId;
    instruction;
    targetFile;
}
exports.EditIntentDto = EditIntentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditIntentDto.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditIntentDto.prototype, "instruction", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditIntentDto.prototype, "targetFile", void 0);
//# sourceMappingURL=generate-website.dto.js.map